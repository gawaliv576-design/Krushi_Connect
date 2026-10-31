package com.krushiseva.service;

import com.krushiseva.entity.Udhari;
import com.krushiseva.repository.UdhariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class UdhariService {
    @Autowired
    private UdhariRepository udhariRepository;

    public Udhari createUdhari(Udhari udhari) {
        return udhariRepository.save(udhari);
    }

    public Udhari updateUdhari(Udhari udhari) {
        return udhariRepository.save(udhari);
    }

    public void deleteUdhari(Long id) {
        udhariRepository.deleteById(id);
    }

    public Optional<Udhari> getUdhariById(Long id) {
        return udhariRepository.findById(id);
    }

    public List<Udhari> getAllUdhari() {
        return udhariRepository.findAll();
    }

    public List<Udhari> getUdhariByUserId(Long userId) {
        return udhariRepository.findByUser_Id(userId);
    }

    public List<Udhari> refreshOverdueStatus(Long userId) {
        List<Udhari> credits = udhariRepository.findByUser_Id(userId);
        LocalDate today = LocalDate.now();
        boolean changed = false;
        for (Udhari credit : credits) {
            if (credit.getStatus() != Udhari.CreditStatus.PAID
                && credit.getStatus() != Udhari.CreditStatus.OVERDUE
                && credit.getDueDate() != null
                && credit.getDueDate().isBefore(today)) {
                credit.setStatus(Udhari.CreditStatus.OVERDUE);
                changed = true;
            }
        }
        return changed ? udhariRepository.saveAll(credits) : credits;
    }

    public List<Udhari> findDueReminderCandidates(LocalDate today) {
        return udhariRepository.findByStatusInAndDueDateBeforeAndReminderSentAtIsNull(
            List.of(Udhari.CreditStatus.PENDING, Udhari.CreditStatus.PARTIAL, Udhari.CreditStatus.OVERDUE),
            today);
    }

    public List<Udhari> getUdhariByStatus(Udhari.CreditStatus status) {
        return udhariRepository.findByStatus(status);
    }
}
