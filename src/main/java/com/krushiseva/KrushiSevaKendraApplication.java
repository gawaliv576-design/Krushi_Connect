package com.krushiseva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class KrushiSevaKendraApplication {

    public static void main(String[] args) {
        SpringApplication.run(KrushiSevaKendraApplication.class, args);
    }
}
