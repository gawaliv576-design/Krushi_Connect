package com.krushiseva.service;

import com.krushiseva.entity.Enquiry;
import com.krushiseva.repository.EnquiryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EnquiryService {
    private final EnquiryRepository enquiryRepository;

    public EnquiryService(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    public Enquiry createEnquiry(String name, String phone, String message) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(name);
        enquiry.setPhone(phone);
        enquiry.setMessage(message);
        return enquiryRepository.save(enquiry);
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public long countOpenEnquiries() {
        return enquiryRepository.countByHandledFalse();
    }

    @Transactional
    public boolean markHandled(Long id) {
        return enquiryRepository.findById(id).map(enquiry -> {
            enquiry.setHandled(true);
            return true;
        }).orElse(false);
    }
}
