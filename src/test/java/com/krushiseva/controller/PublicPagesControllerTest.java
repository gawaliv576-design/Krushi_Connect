package com.krushiseva.controller;

import com.krushiseva.entity.Enquiry;
import com.krushiseva.service.CategoryService;
import com.krushiseva.service.EnquiryService;
import com.krushiseva.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;

import static org.assertj.core.api.Assertions.assertThat;

class PublicPagesControllerTest {
    @Test
    void storesValidContactEnquiryBeforeOpeningWhatsApp() {
        RecordingEnquiryService enquiryService = new RecordingEnquiryService();
        PublicPagesController controller = new PublicPagesController(
            new ProductService(), new CategoryService(), enquiryService);

        String redirect = controller.sendContactMessage(" Ramesh Patil ", "+91 9876543210",
            " Please confirm seed availability. ", new RedirectAttributesModelMap());

        assertThat(redirect).startsWith("redirect:https://wa.me/918600813827?text=");
        assertThat(enquiryService.name).isEqualTo("Ramesh Patil");
        assertThat(enquiryService.phone).isEqualTo("+91 9876543210");
        assertThat(enquiryService.message).isEqualTo("Please confirm seed availability.");
    }

    @Test
    void rejectsInvalidContactPhoneWithoutCreatingAnEnquiry() {
        RecordingEnquiryService enquiryService = new RecordingEnquiryService();
        PublicPagesController controller = new PublicPagesController(
            new ProductService(), new CategoryService(), enquiryService);
        RedirectAttributesModelMap flash = new RedirectAttributesModelMap();
        String redirect = controller.sendContactMessage("Ramesh Patil", "bad", "Please call.",
            flash);

        assertThat(redirect).isEqualTo("redirect:/contact");
        assertThat(flash.getFlashAttributes()).containsKey("contactError");
        assertThat(enquiryService.name).isNull();
    }

    private static class RecordingEnquiryService extends EnquiryService {
        private String name;
        private String phone;
        private String message;

        private RecordingEnquiryService() {
            super(null);
        }

        @Override
        public Enquiry createEnquiry(String name, String phone, String message) {
            this.name = name;
            this.phone = phone;
            this.message = message;
            return new Enquiry();
        }
    }
}
