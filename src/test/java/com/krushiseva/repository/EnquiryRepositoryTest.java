package com.krushiseva.repository;

import com.krushiseva.entity.Enquiry;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class EnquiryRepositoryTest {
    @Autowired
    private EnquiryRepository enquiryRepository;

    @Test
    void savesAndCountsOpenEnquiriesAndOrdersNewestFirst() {
        Enquiry first = enquiry("Ramesh Patil", "Please confirm seed availability.",
            LocalDateTime.of(2026, 10, 1, 10, 0));
        enquiryRepository.save(first);

        Enquiry second = enquiry("Sita Pawar", "Please call about fertilizer.",
            LocalDateTime.of(2026, 10, 2, 10, 0));
        second.setHandled(true);
        enquiryRepository.saveAndFlush(second);

        assertThat(enquiryRepository.countByHandledFalse()).isEqualTo(1);
        assertThat(enquiryRepository.findAllByOrderByCreatedAtDesc())
            .extracting(Enquiry::getName)
            .containsExactly("Sita Pawar", "Ramesh Patil");
    }

    private Enquiry enquiry(String name, String message, LocalDateTime createdAt) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(name);
        enquiry.setPhone("+91 9876543210");
        enquiry.setMessage(message);
        enquiry.setCreatedAt(createdAt);
        return enquiry;
    }
}
