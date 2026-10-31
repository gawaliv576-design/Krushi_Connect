package com.krushiseva.config;

import com.krushiseva.entity.Payment;
import com.krushiseva.entity.Udhari;
import com.krushiseva.entity.User;
import com.krushiseva.repository.PaymentRepository;
import com.krushiseva.repository.UdhariRepository;
import com.krushiseva.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
@Profile("dev")
public class DemoDataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DemoDataInitializer.class);

    private final UserRepository userRepository;
    private final UdhariRepository udhariRepository;
    private final PaymentRepository paymentRepository;
    private final PasswordEncoder passwordEncoder;

    public DemoDataInitializer(UserRepository userRepository,
                               UdhariRepository udhariRepository,
                               PaymentRepository paymentRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.udhariRepository = udhariRepository;
        this.paymentRepository = paymentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedAdmin();
        User farmer = seedFarmer();
        seedUdhariAndPayments(farmer);
        logger.info("Dev demo seed complete: users={}, udhari={}, payments={}",
            userRepository.count(), udhariRepository.count(), paymentRepository.count());
    }

    private void seedAdmin() {
        if (userRepository.findByEmail("admin@krushiseva.com").isPresent()) {
            return;
        }
        User admin = new User();
        admin.setName("Shop Administrator");
        admin.setEmail("admin@krushiseva.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole(User.UserRole.ROLE_ADMIN);
        admin.setVillage("Vaijapur");
        admin.setDistrict("Chhatrapati Sambhajinagar");
        admin.setPhone("+91 8600813827");
        admin.setIsActive(true);
        userRepository.save(admin);
    }

    private User seedFarmer() {
        return userRepository.findByEmail("ramesh@patil.com").orElseGet(() -> {
            User farmer = new User();
            farmer.setName("Ramesh Patil");
            farmer.setEmail("ramesh@patil.com");
            farmer.setPassword(passwordEncoder.encode("farmer123"));
            farmer.setRole(User.UserRole.ROLE_CUSTOMER);
            farmer.setVillage("Mirakhnagar");
            farmer.setDistrict("Chhatrapati Sambhajinagar");
            farmer.setPhone("+91 9876543210");
            farmer.setIsActive(true);
            return userRepository.save(farmer);
        });
    }

    private void seedUdhariAndPayments(User farmer) {
        List<Udhari> credits = udhariRepository.findByUser_Id(farmer.getId());
        if (credits.isEmpty()) {
            Udhari dueSoon = new Udhari();
            dueSoon.setUser(farmer);
            dueSoon.setAmount(new BigDecimal("2400.00"));
            dueSoon.setDueDate(LocalDate.now().plusDays(14));
            dueSoon.setStatus(Udhari.CreditStatus.PENDING);

            Udhari partiallyPaid = new Udhari();
            partiallyPaid.setUser(farmer);
            partiallyPaid.setAmount(new BigDecimal("1250.00"));
            partiallyPaid.setDueDate(LocalDate.now().plusDays(30));
            partiallyPaid.setStatus(Udhari.CreditStatus.PARTIAL);
            udhariRepository.saveAll(List.of(dueSoon, partiallyPaid));
        }

        List<Payment> payments = paymentRepository.findByUser_Id(farmer.getId());
        if (payments.isEmpty()) {
            Payment first = payment(farmer, "1500.00", Payment.PaymentMethod.UPI,
                "UPI payment for seeds", LocalDateTime.now().minusDays(3));
            Payment second = payment(farmer, "800.00", Payment.PaymentMethod.CASH,
                "Cash payment at shop", LocalDateTime.now().minusDays(10));
            paymentRepository.saveAll(List.of(first, second));
        }
    }

    private Payment payment(User farmer, String amount, Payment.PaymentMethod method,
                            String description, LocalDateTime paidAt) {
        Payment payment = new Payment();
        payment.setUser(farmer);
        payment.setAmount(new BigDecimal(amount));
        payment.setMethod(method);
        payment.setStatus(Payment.PaymentStatus.SUCCESS);
        payment.setDescription(description);
        payment.setPaymentDate(paidAt);
        return payment;
    }
}
