package com.krushiseva.controller;

import com.krushiseva.entity.Product;
import com.krushiseva.service.CategoryService;
import com.krushiseva.service.EnquiryService;
import com.krushiseva.service.ProductService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.util.UriUtils;
import org.springframework.http.HttpStatus;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Controller
public class PublicPagesController {
    private static final int DEFAULT_PAGE_SIZE = 12;
    private static final Pattern PHONE_PATTERN = Pattern.compile("[+0-9 ()-]{10,20}");

    private final ProductService productService;
    private final CategoryService categoryService;
    private final EnquiryService enquiryService;

    public PublicPagesController(ProductService productService, CategoryService categoryService,
                                 EnquiryService enquiryService) {
        this.productService = productService;
        this.categoryService = categoryService;
        this.enquiryService = enquiryService;
    }

    @GetMapping("/products")
    public String products(@RequestParam(required = false) Long categoryId,
                          @RequestParam(required = false) String company,
                          @RequestParam(required = false) String q,
                          @RequestParam(required = false) String keyword,
                          @RequestParam(required = false) BigDecimal minPrice,
                          @RequestParam(required = false) BigDecimal maxPrice,
                          @RequestParam(defaultValue = "false") boolean inStock,
                          @RequestParam(defaultValue = "featured") String sort,
                          @RequestParam(defaultValue = "1") int page,
                          @RequestParam(defaultValue = "12") int size,
                          Model model) {
        List<Product> allActive = productService.getActiveProducts();
        String searchQuery = keyword != null ? keyword.trim() : q == null ? "" : q.trim();
        List<Product> filtered = allActive.stream()
            .filter(product -> categoryId == null || (product.getCategory() != null
                && categoryId.equals(product.getCategory().getId())))
            .filter(product -> company == null || company.isBlank()
                || (product.getCompany() != null && product.getCompany().equalsIgnoreCase(company)))
            .filter(product -> searchQuery.isEmpty()
                || containsIgnoreCase(product.getName(), searchQuery)
                || containsIgnoreCase(product.getNameMr(), searchQuery)
                || containsIgnoreCase(product.getCompany(), searchQuery)
                || (product.getCategory() != null && containsIgnoreCase(product.getCategory().getName(), searchQuery)))
            .filter(product -> minPrice == null || sellingPrice(product).compareTo(minPrice) >= 0)
            .filter(product -> maxPrice == null || sellingPrice(product).compareTo(maxPrice) <= 0)
            .filter(product -> !inStock || product.getStockQuantity() != null && product.getStockQuantity() > 0)
            .sorted(comparatorFor(sort))
            .toList();

        int pageSize = size <= 0 ? DEFAULT_PAGE_SIZE : Math.min(size, 48);
        int pageCount = Math.max(1, (filtered.size() + pageSize - 1) / pageSize);
        int currentPage = Math.max(1, Math.min(page, pageCount));
        int start = (currentPage - 1) * pageSize;
        model.addAttribute("products", filtered.subList(start, Math.min(start + pageSize, filtered.size())));
        model.addAttribute("categories", categoryService.getAllCategories());
        model.addAttribute("companies", allActive.stream().map(Product::getCompany)
            .filter(value -> value != null && !value.isBlank()).distinct().sorted(String.CASE_INSENSITIVE_ORDER).toList());
        model.addAttribute("totalProducts", filtered.size());
        model.addAttribute("currentPage", currentPage);
        model.addAttribute("totalPages", pageCount);
        model.addAttribute("pageNumbers", java.util.stream.IntStream.rangeClosed(1, pageCount).boxed().toList());
        model.addAttribute("selectedCategoryId", categoryId);
        model.addAttribute("selectedCompany", company);
        model.addAttribute("minPrice", minPrice);
        model.addAttribute("maxPrice", maxPrice);
        model.addAttribute("inStock", inStock);
        model.addAttribute("sort", sort);
        model.addAttribute("size", pageSize);
        model.addAttribute("searchQuery", searchQuery);
        model.addAttribute("invalidPriceRange", minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0);
        return "public/products";
    }

    @GetMapping("/products/{id}")
    public String productDetails(@PathVariable Long id, Model model) {
        return productService.getProductById(id)
            .filter(product -> product.getStatus() == Product.ProductStatus.ACTIVE)
            .map(product -> {
                model.addAttribute("product", product);
                String message = "Namaskar, I would like to enquire about " + product.getName();
                model.addAttribute("whatsAppOrderUrl", "https://wa.me/918600813827?text="
                    + UriUtils.encodeQueryParam(message, StandardCharsets.UTF_8));
                return "public/product-details";
            })
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
    }

    @GetMapping("/about")
    public String about() {
        return "public/about";
    }

    @GetMapping("/contact")
    public String contact() {
        return "public/contact";
    }

    @PostMapping("/contact/send")
    public String sendContactMessage(@RequestParam String name,
                                     @RequestParam String phone,
                                     @RequestParam String message,
                                     RedirectAttributes redirectAttributes) {
        String trimmedName = name.trim();
        String trimmedPhone = phone.trim();
        String trimmedMessage = message.trim();
        if (trimmedName.isEmpty() || trimmedPhone.isEmpty() || trimmedMessage.isEmpty()
            || trimmedName.length() > 100 || trimmedPhone.length() > 20 || !PHONE_PATTERN.matcher(trimmedPhone).matches()
            || trimmedMessage.length() > 1000) {
            redirectAttributes.addFlashAttribute("contactError", "Please provide your name, a valid phone number and a message.");
            return "redirect:/contact";
        }
        enquiryService.createEnquiry(trimmedName, trimmedPhone, trimmedMessage);
        String text = "Namaskar, I am " + trimmedName + " (" + trimmedPhone + "). " + trimmedMessage;
        return "redirect:https://wa.me/918600813827?text="
            + UriUtils.encodeQueryParam(text, StandardCharsets.UTF_8);
    }

    @GetMapping("/offers")
    public String offers(Model model) {
        List<Product> offers = productService.getActiveProducts().stream()
            .filter(product -> product.getPrice() != null
                && ((product.getMrp() != null && product.getMrp().compareTo(sellingPrice(product)) > 0)
                    || (product.getDiscountPrice() != null
                        && product.getDiscountPrice().compareTo(product.getPrice()) < 0)))
            .toList();
        model.addAttribute("offers", offers);
        return "public/offers";
    }

    @GetMapping("/fertilizer-calc")
    public String fertilizerCalculator() {
        return "public/fertilizer-calc";
    }

    @GetMapping("/fertilizer-calculator")
    public String fertilizerCalculatorAlias() {
        return "public/fertilizer-calc";
    }

    @GetMapping("/faq")
    public String faq() {
        return "public/faq";
    }

    @GetMapping("/weather")
    public String weather() {
        return "public/weather";
    }

    @GetMapping("/farming-tips")
    public String farmingTips() {
        return "public/farming-tips";
    }

    private static BigDecimal sellingPrice(Product product) {
        return product.getDiscountPrice() == null ? product.getPrice() : product.getDiscountPrice();
    }

    private static boolean containsIgnoreCase(String value, String searchQuery) {
        return value != null && value.toLowerCase(Locale.ROOT).contains(searchQuery.toLowerCase(Locale.ROOT));
    }

    private static Comparator<Product> comparatorFor(String sort) {
        Comparator<Product> byName = Comparator.comparing(Product::getName,
            Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER));
        return switch (sort == null ? "" : sort.toLowerCase(Locale.ROOT)) {
            case "price-low", "price_asc" -> Comparator.comparing(PublicPagesController::sellingPrice).thenComparing(byName);
            case "price-high", "price_desc" -> Comparator.comparing(PublicPagesController::sellingPrice).reversed().thenComparing(byName);
            case "name" -> byName;
            case "new" -> Comparator.comparing(Product::getCreatedAt,
                Comparator.nullsLast(Comparator.reverseOrder())).thenComparing(byName);
            case "rating" -> Comparator.comparing(Product::getRating,
                Comparator.nullsLast(Comparator.reverseOrder())).thenComparing(byName);
            default -> Comparator.comparing(Product::getRating,
                Comparator.nullsLast(Comparator.reverseOrder())).thenComparing(byName);
        };
    }
}
