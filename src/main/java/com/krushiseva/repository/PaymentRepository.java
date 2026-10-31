package com.krushiseva.repository;

import com.krushiseva.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUser_Id(Long userId);
    List<Payment> findByStatus(Payment.PaymentStatus status);
}
