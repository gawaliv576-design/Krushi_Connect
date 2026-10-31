package com.krushiseva.controller;

import com.krushiseva.entity.Payment;
import com.krushiseva.entity.Udhari;
import com.krushiseva.entity.User;
import com.krushiseva.service.PaymentService;
import com.krushiseva.service.UdhariService;
import com.krushiseva.service.UserService;
import com.google.zxing.WriterException;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/customer")
@PreAuthorize("isAuthenticated()")
public class CustomerController {
    private static final Pattern PHONE_PATTERN = Pattern.compile("[+0-9 ()-]{10,20}");
    private final UserService userService;
    private final UdhariService udhariService;
    private final PaymentService paymentService;

    public CustomerController(UserService userService, UdhariService udhariService, PaymentService paymentService) {
        this.userService = userService;
        this.udhariService = udhariService;
        this.paymentService = paymentService;
    }

    @GetMapping("/udhari")
    public String udhari(Authentication authentication, Model model) {
        User user = currentUser(authentication);
        List<Udhari> credits = udhariService.refreshOverdueStatus(user.getId());
        BigDecimal outstanding = credits.stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .map(Udhari::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        model.addAttribute("user", user);
        model.addAttribute("udharis", credits);
        model.addAttribute("outstanding", outstanding);
        model.addAttribute("overdueCount", credits.stream()
            .filter(credit -> credit.getStatus() == Udhari.CreditStatus.OVERDUE)
            .count());
        return "customer/udhari";
    }

    @GetMapping("/pay")
    public String pay(Authentication authentication, Model model) {
        User user = currentUser(authentication);
        BigDecimal outstanding = udhariService.refreshOverdueStatus(user.getId()).stream()
            .filter(credit -> credit.getStatus() != Udhari.CreditStatus.PAID)
            .map(Udhari::getAmount)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        model.addAttribute("user", user);
        model.addAttribute("outstanding", outstanding);
        return "customer/pay";
    }

    @GetMapping(value = "/pay/qr", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> qr(@RequestParam(required = false) BigDecimal amount,
                                     @RequestParam(required = false) String note) throws WriterException, IOException {
        if (amount != null && (amount.signum() <= 0 || amount.compareTo(new BigDecimal("10000000")) > 0)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Enter a valid payment amount.");
        }
        if (note != null && note.length() > 100) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment note is too long.");
        }
        return ResponseEntity.ok()
            .cacheControl(CacheControl.noStore())
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"upi-payment.png\"")
            .contentType(MediaType.IMAGE_PNG)
            .body(paymentService.createUpiQrPng(amount, note));
    }

    @GetMapping("/payments")
    public String payments(Authentication authentication, Model model) {
        User user = currentUser(authentication);
        model.addAttribute("user", user);
        model.addAttribute("payments", paymentService.getPaymentsByUserId(user.getId()));
        return "farmer/payments/list";
    }

    @GetMapping("/profile")
    public String profile(Authentication authentication, Model model) {
        model.addAttribute("user", currentUser(authentication));
        return "customer/profile";
    }

    @PostMapping("/profile/update")
    public String updateProfile(Authentication authentication,
                                @RequestParam String name,
                                @RequestParam(required = false) String phone,
                                @RequestParam(required = false) String village,
                                @RequestParam(required = false) String district,
                                @RequestParam(defaultValue = "false") boolean whatsappReminderOptIn,
                                RedirectAttributes redirectAttributes) {
        User user = currentUser(authentication);
        String normalizedName = name.trim();
        if (normalizedName.isEmpty() || normalizedName.length() > 100
            || (phone != null && !phone.isBlank() && !PHONE_PATTERN.matcher(phone.trim()).matches())
            || (village != null && village.length() > 100)
            || (district != null && district.length() > 100)) {
            redirectAttributes.addFlashAttribute("profileError", "Please check your profile details and try again.");
            return "redirect:/customer/profile";
        }
        user.setName(normalizedName);
        user.setPhone(phone == null ? "" : phone.trim());
        user.setVillage(village == null ? "" : village.trim());
        user.setDistrict(district == null ? "" : district.trim());
        if (whatsappReminderOptIn && !Boolean.TRUE.equals(user.getWhatsappReminderOptIn())) {
            user.setWhatsappReminderOptInAt(java.time.LocalDateTime.now());
        } else if (!whatsappReminderOptIn) {
            user.setWhatsappReminderOptInAt(null);
        }
        user.setWhatsappReminderOptIn(whatsappReminderOptIn);
        userService.updateUser(user);
        redirectAttributes.addFlashAttribute("profileSuccess", "Your profile details have been updated.");
        return "redirect:/customer/profile";
    }

    private User currentUser(Authentication authentication) {
        return userService.findByEmail(authentication.getName())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer account not found."));
    }
}
