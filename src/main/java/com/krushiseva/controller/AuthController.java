package com.krushiseva.controller;

import com.krushiseva.entity.User;
import com.krushiseva.service.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Locale;
import java.util.regex.Pattern;

@Controller
public class AuthController {
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("[+0-9 ()-]{10,20}");

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login() {
        return "auth/login";
    }

    @GetMapping("/register")
    public String registerForm(Model model) {
        model.addAttribute("user", new User());
        return "auth/register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        String email = user.getEmail() == null ? "" : user.getEmail().trim().toLowerCase(Locale.ROOT);
        String name = user.getName() == null ? "" : user.getName().trim();
        String phone = user.getPhone() == null ? "" : user.getPhone().trim();
        String password = user.getPassword() == null ? "" : user.getPassword();
        if (name.isEmpty() || name.length() > 100 || email.length() > 254 || !EMAIL_PATTERN.matcher(email).matches()
            || phone.isEmpty() || !PHONE_PATTERN.matcher(phone).matches()
            || password.length() < 8 || password.length() > 72
            || (user.getVillage() != null && user.getVillage().length() > 100)
            || (user.getDistrict() != null && user.getDistrict().length() > 100)) {
            return registrationError(user, model,
                "Please check your details. Use a valid email and phone number, and a password of 8–72 characters.");
        }
        if (userService.findByEmail(email).isPresent()) {
            return registrationError(user, model, "An account already exists for this email address.");
        }

        user.setName(name);
        user.setEmail(email);
        user.setPhone(phone);
        user.setRole(User.UserRole.ROLE_CUSTOMER);
        user.setIsActive(true);
        user.setWhatsappReminderOptIn(false);
        user.setWhatsappReminderOptInAt(null);
        try {
            userService.createUser(user);
            return "redirect:/login?registered";
        } catch (DataIntegrityViolationException exception) {
            return registrationError(user, model,
                "An account already exists for this email address. Please sign in.");
        }
    }

    private String registrationError(User user, Model model, String message) {
        user.setPassword(null);
        model.addAttribute("error", message);
        model.addAttribute("user", user);
        return "auth/register";
    }
}
