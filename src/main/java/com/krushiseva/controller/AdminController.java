package com.krushiseva.controller;

import com.krushiseva.entity.*;
import com.krushiseva.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UdhariService udhariService;

    @Autowired
    private ProductImageStorage productImageStorage;

    @Autowired
    private EnquiryService enquiryService;

    @GetMapping("/dashboard")
    public String dashboard(Model model, Authentication authentication) {
        List<Product> products = productService.getAllProducts();
        List<User> users = userService.getAllUsers();
        List<Payment> payments = paymentService.getAllPayments();
        List<Payment> recentPayments = payments.stream()
            .sorted(Comparator.comparing(Payment::getPaymentDate, Comparator.nullsLast(Comparator.reverseOrder())))
            .limit(8)
            .toList();
        List<Udhari> udharis = udhariService.getAllUdhari();
        BigDecimal outstanding = udharis.stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .map(Udhari::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        YearMonth currentMonth = YearMonth.now();
        BigDecimal monthlyRevenue = payments.stream()
            .filter(payment -> payment.getStatus() == Payment.PaymentStatus.SUCCESS
                && payment.getPaymentDate() != null
                && YearMonth.from(payment.getPaymentDate()).equals(currentMonth))
            .map(Payment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        LocalDate today = LocalDate.now();
        BigDecimal todaysPayments = payments.stream()
            .filter(payment -> payment.getStatus() == Payment.PaymentStatus.SUCCESS
                && payment.getPaymentDate() != null
                && payment.getPaymentDate().toLocalDate().equals(today))
            .map(Payment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        List<YearMonth> chartMonths = java.util.stream.IntStream.rangeClosed(0, 5)
            .mapToObj(offset -> YearMonth.now().minusMonths(5L - offset))
            .toList();

        model.addAttribute("totalProducts", products.size());
        model.addAttribute("totalUsers", users.size());
        model.addAttribute("udhariOutstanding", outstanding);
        model.addAttribute("monthlyRevenue", monthlyRevenue);
        model.addAttribute("todayPayments", todaysPayments);
        model.addAttribute("lowStockCount", products.stream().filter(this::isLowStock).count());
        model.addAttribute("chartLabels", chartMonths.stream().map(YearMonth::toString).toList());
        model.addAttribute("chartValues", chartMonths.stream().map(month -> payments.stream()
            .filter(payment -> payment.getStatus() == Payment.PaymentStatus.SUCCESS
                && payment.getPaymentDate() != null
                && YearMonth.from(payment.getPaymentDate()).equals(month))
            .map(Payment::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add)).toList());
        model.addAttribute("recentOrders", recentPayments);
        model.addAttribute("lowStockProducts", products.stream()
            .filter(this::isLowStock)
            .toList());
        model.addAttribute("totalCategories", categoryService.getAllCategories().size());
        model.addAttribute("totalFarmers", customerAccounts().size());
        model.addAttribute("totalPayments", payments.size());
        model.addAttribute("pendingUdhariCount", udharis.stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .count());
        model.addAttribute("shopName", "Saptashrungi Agro Services");
        model.addAttribute("shopNameMr", "सप्तशृंगी ॲग्रो सर्व्हिसेस");
        return "admin/dashboard";
    }

    // Product Management
    @GetMapping("/products")
    public String listProducts(Model model) {
        populateAdminCounts(model);
        model.addAttribute("products", productService.getAllProducts());
        return "admin/products";
    }

    @GetMapping({"/products/create", "/products/add"})
    public String createProductForm(Model model) {
        populateAdminCounts(model);
        model.addAttribute("product", new Product());
        model.addAttribute("categories", categoryService.getAllCategories());
        return "admin/product-form";
    }

    @PostMapping(value = "/products/save", consumes = {"multipart/form-data"})
    public String saveProduct(@Valid @ModelAttribute Product product, BindingResult bindingResult,
                              @RequestParam(required = false) Long categoryId,
                              @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
                              Model model,
                              RedirectAttributes redirectAttributes) throws java.io.IOException {
        if (bindingResult.hasErrors()) {
            populateProductForm(model);
            return "admin/product-form";
        }
        assignCategory(product, categoryId);
        normalizeInventoryDefaults(product);
        storeProductImage(product, imageFile);
        productService.createProduct(product);
        redirectAttributes.addFlashAttribute("successMessage", "Product added successfully.");
        return "redirect:/admin/products";
    }

    @GetMapping({"/products/edit/{id}", "/products/{id}/edit"})
    public String editProductForm(@PathVariable Long id, Model model) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            populateAdminCounts(model);
            model.addAttribute("product", product.get());
            model.addAttribute("categories", categoryService.getAllCategories());
            return "admin/product-form";
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found.");
    }

    @PostMapping(value = {"/products/update/{id}", "/products/update"}, consumes = {"multipart/form-data"})
    public String updateProduct(@PathVariable(required = false) Long id,
                                @Valid @ModelAttribute Product product,
                                BindingResult bindingResult,
                                @RequestParam(required = false) Long categoryId,
                                @RequestParam(value = "imageFile", required = false) MultipartFile imageFile,
                                Model model,
                                RedirectAttributes redirectAttributes) throws java.io.IOException {
        Long productId = id != null ? id : product.getId();
        if (productId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product ID is required.");
        }
        if (bindingResult.hasErrors()) {
            product.setId(productId);
            populateProductForm(model);
            return "admin/product-form";
        }
        Product saved = productService.getProductById(productId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found."));
            saved.setName(product.getName());
            saved.setNameMr(product.getNameMr());
            saved.setCompany(product.getCompany());
            saved.setPrice(product.getPrice());
            saved.setMrp(product.getMrp());
            saved.setDiscountPrice(product.getDiscountPrice());
            saved.setGstRate(product.getGstRate());
            saved.setStockQuantity(product.getStockQuantity());
            saved.setMinimumStock(product.getMinimumStock());
            saved.setStatus(product.getStatus());
            saved.setDescription(product.getDescription());
            saved.setExpiryDate(product.getExpiryDate());
            saved.setBatchNumber(product.getBatchNumber());
            normalizeInventoryDefaults(saved);
            assignCategory(saved, categoryId);
            storeProductImage(saved, imageFile);
            productService.updateProduct(saved);
        redirectAttributes.addFlashAttribute("successMessage", "Product updated successfully.");
        return "redirect:/admin/products";
    }

    @PostMapping({"/products/delete/{id}", "/products/{id}/delete"})
    public String deleteProduct(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        productService.deleteProduct(id);
        redirectAttributes.addFlashAttribute("successMessage", "Product deleted.");
        return "redirect:/admin/products";
    }

    @GetMapping("/inventory")
    public String inventory(Model model) {
        populateAdminCounts(model);
        List<Product> products = productService.getAllProducts();
        LocalDate expiryWindow = LocalDate.now().plusDays(90);
        model.addAttribute("products", products);
        model.addAttribute("lowStockProducts", products.stream().filter(this::isLowStock).toList());
        model.addAttribute("expiringProducts", products.stream()
            .filter(product -> product.getExpiryDate() != null
                && !product.getExpiryDate().isBefore(LocalDate.now())
                && !product.getExpiryDate().isAfter(expiryWindow))
            .toList());
        model.addAttribute("expiredProducts", products.stream()
            .filter(product -> product.getExpiryDate() != null
                && product.getExpiryDate().isBefore(LocalDate.now()))
            .toList());
        return "admin/inventory";
    }

    @GetMapping("/enquiries")
    public String enquiries(Model model) {
        populateAdminCounts(model);
        model.addAttribute("enquiries", enquiryService.getAllEnquiries());
        return "admin/enquiries";
    }

    @PostMapping("/enquiries/{id}/mark-handled")
    public String markEnquiryHandled(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        if (!enquiryService.markHandled(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Enquiry not found.");
        }
        redirectAttributes.addFlashAttribute("successMessage", "Enquiry marked as handled.");
        return "redirect:/admin/enquiries";
    }

    @GetMapping("/reports")
    public String reports(Model model) {
        populateAdminCounts(model);
        dashboard(model, null);
        return "admin/reports";
    }

    private void assignCategory(Product product, Long categoryId) {
        product.setCategory(categoryId == null ? null : categoryService.getCategoryById(categoryId)
            .orElseThrow(() -> new IllegalArgumentException("Selected category does not exist.")));
    }

    private void storeProductImage(Product product, MultipartFile imageFile) throws java.io.IOException {
        String storedImage = productImageStorage.store(imageFile);
        if (storedImage != null) {
            product.setImage(storedImage);
        }
        product.setImageUrl(product.getImage());
    }

    private void normalizeInventoryDefaults(Product product) {
        if (product.getStockQuantity() == null) {
            product.setStockQuantity(0);
        }
        if (product.getMinimumStock() == null) {
            product.setMinimumStock(10);
        }
        if (product.getGstRate() == null) {
            product.setGstRate(BigDecimal.ZERO);
        }
        if (product.getStatus() == null) {
            product.setStatus(Product.ProductStatus.ACTIVE);
        }
    }

    private boolean isLowStock(Product product) {
        return product.getStockQuantity() != null
            && product.getMinimumStock() != null
            && product.getStockQuantity() <= product.getMinimumStock();
    }

    private void populateAdminCounts(Model model) {
        List<Product> products = productService.getAllProducts();
        List<Udhari> udharis = udhariService.getAllUdhari();
        model.addAttribute("totalProducts", products.size());
        model.addAttribute("lowStockCount", products.stream().filter(this::isLowStock).count());
        model.addAttribute("totalCategories", categoryService.getAllCategories().size());
        model.addAttribute("totalFarmers", customerAccounts().size());
        model.addAttribute("totalPayments", paymentService.getAllPayments().size());
        model.addAttribute("openEnquiryCount", enquiryService.countOpenEnquiries());
        model.addAttribute("pendingUdhariCount", udharis.stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .count());
    }

    private void populateProductForm(Model model) {
        populateAdminCounts(model);
        model.addAttribute("categories", categoryService.getAllCategories());
    }

    // Category Management
    @GetMapping("/categories")
    public String listCategories(Model model) {
        populateAdminCounts(model);
        List<Category> categories = categoryService.getAllCategories();
        model.addAttribute("categories", categories);
        return "admin/categories/list";
    }

    @GetMapping("/categories/create")
    public String createCategoryForm(Model model) {
        populateAdminCounts(model);
        model.addAttribute("category", new Category());
        return "admin/categories/form";
    }

    @PostMapping("/categories/save")
    public String saveCategory(Category category) {
        categoryService.createCategory(category);
        return "redirect:/admin/categories";
    }

    @GetMapping("/categories/edit/{id}")
    public String editCategoryForm(@PathVariable Long id, Model model) {
        populateAdminCounts(model);
        Optional<Category> category = categoryService.getCategoryById(id);
        category.ifPresent(c -> model.addAttribute("category", c));
        return "admin/categories/form";
    }

    @PostMapping("/categories/update/{id}")
    public String updateCategory(@PathVariable Long id, Category category) {
        category.setId(id);
        categoryService.updateCategory(category);
        return "redirect:/admin/categories";
    }

    @PostMapping("/categories/delete/{id}")
    public String deleteCategory(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        categoryService.deleteCategory(id);
        redirectAttributes.addFlashAttribute("successMessage", "Category deleted.");
        return "redirect:/admin/categories";
    }

    // Farmer Management
    @GetMapping("/farmers")
    public String listFarmers(Model model) {
        populateAdminCounts(model);
        List<User> farmers = customerAccounts();
        model.addAttribute("farmers", farmers);
        return "admin/farmers/list";
    }

    // Payment Management
    @GetMapping("/payments")
    public String listPayments(Model model) {
        populateAdminCounts(model);
        List<Payment> payments = paymentService.getAllPayments();
        model.addAttribute("payments", payments);
        return "admin/payments/list";
    }

    @GetMapping("/payments/create")
    public String createPaymentForm(Model model) {
        populateAdminCounts(model);
        model.addAttribute("payment", new Payment());
        model.addAttribute("farmers", customerAccounts());
        return "admin/payments/form";
    }

    @PostMapping("/payments/save")
    public String savePayment(Payment payment, @RequestParam("userId") Long userId) {
        Optional<User> user = userService.findById(userId);
        user.ifPresent(payment::setUser);
        paymentService.createPayment(payment);
        return "redirect:/admin/payments";
    }

    // Udhari/Credit Management
    @GetMapping("/udhari")
    public String listUdhari(Model model) {
        populateAdminCounts(model);
        List<Udhari> udharis = udhariService.getAllUdhari();
        model.addAttribute("udharis", udharis);
        return "admin/udhari";
    }

    @PostMapping("/udhari/{id}/mark-paid")
    public String markUdhariPaid(@PathVariable Long id) {
        Udhari udhari = udhariService.getUdhariById(id)
            .orElseThrow(() -> new IllegalArgumentException("Udhari account was not found."));
        udhari.setStatus(Udhari.CreditStatus.PAID);
        udhariService.updateUdhari(udhari);
        return "redirect:/admin/udhari";
    }

    @GetMapping("/udhari/create")
    public String createUdhariForm(Model model) {
        populateAdminCounts(model);
        model.addAttribute("udhari", new Udhari());
        model.addAttribute("farmers", customerAccounts());
        return "admin/udhari/form";
    }

    @PostMapping("/udhari/save")
    public String saveUdhari(Udhari udhari, @RequestParam("userId") Long userId) {
        Optional<User> user = userService.findById(userId);
        user.ifPresent(udhari::setUser);
        udhariService.createUdhari(udhari);
        return "redirect:/admin/udhari";
    }

    private List<User> customerAccounts() {
        return userService.findByRoleIn(List.of(User.UserRole.ROLE_FARMER, User.UserRole.ROLE_CUSTOMER));
    }
}
