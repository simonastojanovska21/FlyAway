package com.example.backend.web;

import com.example.backend.service.impl.PaymentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class PaymentRestControllerTest {
    @InjectMocks
    PaymentRestController paymentRestController;

    @Mock
    PaymentService paymentService;

    @Test
    void completePayment() {
    }

    @Test
    void handleError() {
    }
}