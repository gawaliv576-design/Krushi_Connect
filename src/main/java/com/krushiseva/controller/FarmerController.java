package com.krushiseva.controller;

import com.krushiseva.entity.*;
import com.krushiseva.service.PaymentService;
import com.krushiseva.service.ProductService;
import com.krushiseva.service.UdhariService;
import com.krushiseva.service.UpiQrService;
import com.krushiseva.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import com.google.zxing.WriterException;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/farmer")
public class FarmerController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UdhariService udhariService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UpiQrService upiQrService;

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);
        return user.orElse(null);
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication, Model model) {
        User user = getCurrentUser(authentication);
        if (user != null) {
            List<Payment> payments = paymentService.getPaymentsByUserId(user.getId());
            List<Udhari> udharis = udhariService.refreshOverdueStatus(user.getId());

            model.addAttribute("user", user);
            model.addAttribute("payments", payments.stream().limit(5).toList());
            model.addAttribute("udharis", udharis);
            model.addAttribute("totalPayments", payments.size());
            model.addAttribute("totalUdharis", udharis.stream()
                .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
                .count());
            model.addAttribute("outstanding", udharis.stream()
                .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
                .map(Udhari::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add));
        }
        return "farmer/dashboard";
    }

    @GetMapping("/products")
    public String viewProducts(Model model) {
        model.addAttribute("products", productService.getActiveProducts());
        return "farmer/products/list";
    }

    @GetMapping("/products/{id}")
    public String productDetails(@PathVariable Long id, Model model) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isEmpty()) {
            throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, "Product not found.");
        }
        Product selectedProduct = product.get();
        model.addAttribute("product", selectedProduct);
        String message = "Namaskar, I would like to enquire about " + selectedProduct.getName();
        model.addAttribute("whatsAppOrderUrl", "https://wa.me/918600813827?text="
            + UriUtils.encodeQueryParam(message, StandardCharsets.UTF_8));
        return "farmer/products/details";
    }

    @GetMapping("/payments")
    public String viewPayments() {
        return "redirect:/customer/payments";
    }

    @GetMapping("/udhari")
    public String viewUdhari(Authentication authentication, Model model) {
        User user = getCurrentUser(authentication);
        if (user != null) {
            List<Udhari> udharis = udhariService.refreshOverdueStatus(user.getId());
            BigDecimal outstanding = udharis.stream()
                .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
                .map(Udhari::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
            model.addAttribute("udharis", udharis);
            model.addAttribute("user", user);
            model.addAttribute("outstanding", outstanding);
            model.addAttribute("overdueCount", udharis.stream()
                .filter(credit -> credit.getStatus() == Udhari.CreditStatus.OVERDUE)
                .count());
            return "customer/udhari";
        }
        return "redirect:/login";
    }

    @GetMapping("/pay")
    public String paymentPage(Authentication authentication, Model model) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }
        List<Udhari> udharis = udhariService.refreshOverdueStatus(user.getId());
        BigDecimal outstanding = udharis.stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .map(Udhari::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        model.addAttribute("user", user);
        model.addAttribute("outstanding", outstanding);
        return "customer/pay";
    }

    @GetMapping(value = "/pay/upi_qr.jpg", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> upiQr(@RequestParam(required = false) BigDecimal amount) throws WriterException, IOException {
        if (amount != null && (amount.signum() < 0 || amount.compareTo(new BigDecimal("10000000")) > 0)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok()
            .cacheControl(CacheControl.noStore())
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"upi_qr.jpg\"")
            .contentType(MediaType.IMAGE_JPEG)
            .body(upiQrService.createJpeg(amount));
    }

    @GetMapping("/profile")
    public String viewProfile(Authentication authentication, Model model) {
        User user = getCurrentUser(authentication);
        if (user != null) {
            model.addAttribute("user", user);
            return "customer/profile";
        }
        return "redirect:/login";
    }

    @PostMapping("/profile/update")
    public String updateProfile(Authentication authentication,
                                User updatedUser,
                                @RequestParam(defaultValue = "false") boolean whatsappReminderOptIn,
                                RedirectAttributes redirectAttributes) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }
        user.setName(updatedUser.getName().trim());
        user.setPhone(updatedUser.getPhone());
        user.setVillage(updatedUser.getVillage());
        user.setDistrict(updatedUser.getDistrict());
        if (whatsappReminderOptIn && !Boolean.TRUE.equals(user.getWhatsappReminderOptIn())) {
            user.setWhatsappReminderOptInAt(java.time.LocalDateTime.now());
        } else if (!whatsappReminderOptIn) {
            user.setWhatsappReminderOptInAt(null);
        }
        user.setWhatsappReminderOptIn(whatsappReminderOptIn);
        userService.updateUser(user);
        redirectAttributes.addFlashAttribute("profileSuccess", "Your profile details have been updated.");
        return "redirect:/farmer/profile";
    }

    @PostMapping("/profile/password")
    public String changePassword(Authentication authentication,
                                 @RequestParam String currentPassword,
                                 @RequestParam String newPassword,
                                 @RequestParam String confirmPassword,
                                 RedirectAttributes redirectAttributes) {
        User user = getCurrentUser(authentication);
        if (user == null) {
            return "redirect:/login";
        }
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            redirectAttributes.addFlashAttribute("passwordError", "Your current password is incorrect.");
        } else if (newPassword.length() < 8) {
            redirectAttributes.addFlashAttribute("passwordError", "Choose a password with at least 8 characters.");
        } else if (!newPassword.equals(confirmPassword)) {
            redirectAttributes.addFlashAttribute("passwordError", "The new password and confirmation do not match.");
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user);
            redirectAttributes.addFlashAttribute("passwordSuccess", "Your password has been changed.");
        }
        return "redirect:/farmer/profile";
    }
}
