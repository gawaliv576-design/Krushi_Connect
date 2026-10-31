package com.krushiseva.service;

import com.krushiseva.config.WhatsAppReminderProperties;
import com.krushiseva.entity.Udhari;
import com.krushiseva.entity.User;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.net.URI;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class WhatsAppCloudApiClient {
    private static final DateTimeFormatter DUE_DATE_FORMAT = DateTimeFormatter.ofPattern("dd MMM yyyy");

    private final WhatsAppReminderProperties properties;
    private final RestTemplate restTemplate;

    public WhatsAppCloudApiClient(WhatsAppReminderProperties properties, RestTemplateBuilder restTemplateBuilder) {
        this.properties = properties;
        this.restTemplate = restTemplateBuilder.build();
    }

    public boolean sendOverdueReminder(Udhari udhari, String shopName) {
        User farmer = udhari.getUser();
        Optional<String> recipient = normalizePhoneNumber(farmer.getPhone());
        if (recipient.isEmpty()) {
            return false;
        }

        Map<String, Object> body = Map.of(
            "messaging_product", "whatsapp",
            "to", recipient.get(),
            "type", "template",
            "template", Map.of(
                "name", properties.getTemplateName(),
                "language", Map.of("code", properties.getTemplateLanguage()),
                "components", List.of(Map.of(
                    "type", "body",
                    "parameters", List.of(
                        textParameter(farmer.getName()),
                        textParameter(formatAmount(udhari.getAmount())),
                        textParameter(udhari.getDueDate().format(DUE_DATE_FORMAT)),
                        textParameter(shopName)
                    )
                ))
            )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(properties.getAccessToken());
        headers.setContentType(MediaType.APPLICATION_JSON);
        URI endpoint = URI.create("https://graph.facebook.com/"
            + properties.getGraphApiVersion()
            + "/"
            + properties.getPhoneNumberId()
            + "/messages");
        restTemplate.postForEntity(endpoint, new HttpEntity<>(body, headers), String.class);
        return true;
    }

    private Map<String, String> textParameter(String value) {
        return Map.of("type", "text", "text", value == null ? "" : value);
    }

    private String formatAmount(BigDecimal amount) {
        return amount.setScale(2, java.math.RoundingMode.HALF_UP).toPlainString();
    }

    private Optional<String> normalizePhoneNumber(String phone) {
        if (phone == null || phone.isBlank()) {
            return Optional.empty();
        }
        String digits = phone.replaceAll("\\D", "");
        if (digits.length() == 10) {
            digits = "91" + digits;
        }
        return digits.length() >= 11 && digits.length() <= 15
            ? Optional.of(digits)
            : Optional.empty();
    }
}
