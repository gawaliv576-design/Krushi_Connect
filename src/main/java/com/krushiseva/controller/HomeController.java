package com.krushiseva.controller;

import com.krushiseva.entity.User;
import com.krushiseva.service.CategoryService;
import com.krushiseva.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Optional;

@Controller
public class HomeController {
    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("categories", categoryService.getAllCategories());
        model.addAttribute("shopName", "Saptashrungi Agro Services");
        model.addAttribute("shopNameMr", "सप्तशृंगी ॲग्रो सर्व्हिसेस");
        model.addAttribute("phone", "+91 8600813827");
        model.addAttribute("address", "Mirakhnagar, Vaijapur, Chhatrapati Sambhajinagar, Maharashtra - 423703");
        return "index";
    }

    @GetMapping("/home")
    public String homePage(Model model) {
        return home(model);
    }

    @GetMapping("/dashboard")
    public String dashboard(Authentication authentication, Model model) {
        String email = authentication.getName();
        Optional<User> user = userService.findByEmail(email);

        if (user.isPresent()) {
            model.addAttribute("user", user.get());

            if (user.get().getRole() == User.UserRole.ROLE_ADMIN) {
                return "redirect:/admin/dashboard";
            } else if (user.get().getRole() == User.UserRole.ROLE_FARMER
                || user.get().getRole() == User.UserRole.ROLE_CUSTOMER) {
                return "redirect:/farmer/dashboard";
            }
        }

        return "redirect:/";
    }

    @GetMapping("/logout")
    public String logout() {
        return "redirect:/";
    }
}
