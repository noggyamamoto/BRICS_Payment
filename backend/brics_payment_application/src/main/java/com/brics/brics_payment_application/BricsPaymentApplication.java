package com.brics.brics_payment_application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {
        "config", "controller", "service", "exception",
        "com.brics.brics_payment_application"
})
@EnableJpaRepositories(basePackages = "repository")
@EntityScan(basePackages = "model")
public class BricsPaymentApplication {

    public static void main(String[] args) {
        SpringApplication.run(BricsPaymentApplication.class, args);
    }
}