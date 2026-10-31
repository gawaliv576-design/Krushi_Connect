package com.krushiseva.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.util.UriComponentsBuilder;
import com.krushiseva.security.CustomUserDetailsService.CustomUserDetails;

import java.util.Locale;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ModelAttribute
    public void addLanguageSwitcherUrls(HttpServletRequest request, Model model, Authentication authentication) {
        model.addAttribute("languageUrlMr", languageUrl(request, "mr"));
        model.addAttribute("languageUrlEn", languageUrl(request, "en"));
        if (authentication != null && authentication.isAuthenticated()
            && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            String name = userDetails.getUser().getName();
            model.addAttribute("currentUserDisplayName", name);
            model.addAttribute("currentUserInitials", initials(name));
        }
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ModelAndView handleStatusException(ResponseStatusException exception) {
        HttpStatusCode status = exception.getStatusCode();
        String template = errorTemplate(status);
        ModelAndView view = new ModelAndView(template);
        view.setStatus(status);
        view.addObject("errorMessage", exception.getReason());
        return view;
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ModelAndView handleMethodNotSupported(HttpRequestMethodNotSupportedException exception) {
        ModelAndView view = new ModelAndView("errors/405");
        view.setStatus(HttpStatus.METHOD_NOT_ALLOWED);
        view.addObject("errorMessage", "This action does not support the requested method.");
        return view;
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView handleUnexpectedException(Exception exception) {
        logger.error("Unexpected request failure.", exception);
        ModelAndView view = new ModelAndView("errors/500");
        view.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        return view;
    }

    private String errorTemplate(HttpStatusCode status) {
        if (status.value() == HttpStatus.NOT_FOUND.value()) {
            return "errors/404";
        }
        if (status.value() == HttpStatus.FORBIDDEN.value()) {
            return "errors/403";
        }
        if (status.value() == HttpStatus.METHOD_NOT_ALLOWED.value()) {
            return "errors/405";
        }
        return "errors/500";
    }

    private String languageUrl(HttpServletRequest request, String language) {
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath(request.getRequestURI());
        request.getParameterMap().forEach((name, values) -> {
            if (!"lang".equals(name)) {
                for (String value : values) {
                    builder.queryParam(name, value);
                }
            }
        });
        return builder.queryParam("lang", language).build().encode().toUriString();
    }

    private String initials(String name) {
        if (name == null || name.isBlank()) {
            return "KS";
        }
        String[] words = name.trim().split("\\s+");
        StringBuilder result = new StringBuilder();
        result.appendCodePoint(words[0].codePointAt(0));
        if (words.length > 1) {
            result.appendCodePoint(words[words.length - 1].codePointAt(0));
        }
        return result.toString().toUpperCase(Locale.ROOT);
    }
}
