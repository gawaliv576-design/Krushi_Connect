package com.krushiseva.service;

import com.krushiseva.config.WhatsAppReminderProperties;
import com.krushiseva.entity.Udhari;
import com.krushiseva.entity.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;

import jakarta.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@ConditionalOnProperty(prefix = "app.whatsapp-reminders", name = "enabled", havingValue = "true")
public class WhatsAppReminderScheduler {
    private static final Logger logger = LoggerFactory.getLogger(WhatsAppReminderScheduler.class);

    private final WhatsAppReminderProperties properties;
    private final UdhariService udhariService;
    private final WhatsAppCloudApiClient whatsappClient;

    public WhatsAppReminderScheduler(WhatsAppReminderProperties properties,
                                     UdhariService udhariService,
                                     WhatsAppCloudApiClient whatsappClient) {
        this.properties = properties;
        this.udhariService = udhariService;
        this.whatsappClient = whatsappClient;
    }

    @PostConstruct
    void validateConfiguration() {
        properties.validateForSending();
    }

    @Scheduled(cron = "${app.whatsapp-reminders.cron:0 0 9 * * *}")
    public void sendOverdueReminders() {
        List<Udhari> candidates = udhariService.findDueReminderCandidates(LocalDate.now());
        for (Udhari udhari : candidates) {
            User farmer = udhari.getUser();
            if (!Boolean.TRUE.equals(farmer.getWhatsappReminderOptIn())) {
                continue;
            }

            udhari.setStatus(Udhari.CreditStatus.OVERDUE);
            try {
                if (whatsappClient.sendOverdueReminder(udhari, "Saptashrungi Agro Services")) {
                    udhari.setReminderSentAt(LocalDateTime.now());
                    udhariService.updateUdhari(udhari);
                    logger.info("Sent overdue WhatsApp reminder for credit record {}", udhari.getId());
                } else {
                    udhariService.updateUdhari(udhari);
                    logger.warn("Skipped overdue WhatsApp reminder for credit record {} because the farmer phone number is missing or invalid.",
                        udhari.getId());
                }
            } catch (RestClientException exception) {
                udhariService.updateUdhari(udhari);
                logger.error("WhatsApp Cloud API request failed for credit record {} with status {}.",
                    udhari.getId(),
                    exception instanceof org.springframework.web.client.RestClientResponseException responseException
                        ? responseException.getStatusCode()
                        : "unavailable",
                    exception);
            }
        }
    }
}
