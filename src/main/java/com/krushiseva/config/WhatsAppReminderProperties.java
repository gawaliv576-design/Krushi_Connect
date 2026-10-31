package com.krushiseva.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.whatsapp-reminders")
public class WhatsAppReminderProperties {
    private boolean enabled;
    private String accessToken;
    private String phoneNumberId;
    private String graphApiVersion;
    private String templateName;
    private String templateLanguage;

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getPhoneNumberId() {
        return phoneNumberId;
    }

    public void setPhoneNumberId(String phoneNumberId) {
        this.phoneNumberId = phoneNumberId;
    }

    public String getGraphApiVersion() {
        return graphApiVersion;
    }

    public void setGraphApiVersion(String graphApiVersion) {
        this.graphApiVersion = graphApiVersion;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getTemplateLanguage() {
        return templateLanguage;
    }

    public void setTemplateLanguage(String templateLanguage) {
        this.templateLanguage = templateLanguage;
    }

    public void validateForSending() {
        if (isBlank(accessToken)
            || isBlank(phoneNumberId)
            || isBlank(templateName)
            || isBlank(templateLanguage)
            || graphApiVersion == null
            || !graphApiVersion.matches("v[0-9]+\\.[0-9]+")
            || !phoneNumberId.matches("[0-9]+")
            || !templateName.matches("[a-zA-Z0-9_]+")
            || !templateLanguage.matches("[a-zA-Z]{2,3}(_[a-zA-Z]{2,4})?")) {
            throw new IllegalStateException(
                "WhatsApp reminders are enabled, but valid Cloud API credentials, phone number ID, API version, and approved template settings are required.");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
