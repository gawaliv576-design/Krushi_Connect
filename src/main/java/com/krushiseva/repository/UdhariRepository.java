package com.krushiseva.repository;

import com.krushiseva.entity.Udhari;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.time.LocalDate;

@Repository
public interface UdhariRepository extends JpaRepository<Udhari, Long> {
    List<Udhari> findByUser_Id(Long userId);
    List<Udhari> findByStatus(Udhari.CreditStatus status);
    List<Udhari> findByStatusInAndDueDateBeforeAndReminderSentAtIsNull(
        List<Udhari.CreditStatus> statuses, LocalDate dueDate);
}
