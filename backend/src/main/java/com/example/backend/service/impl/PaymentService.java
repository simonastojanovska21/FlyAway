package com.example.backend.service.impl;

import com.example.backend.model.payment.PaymentRequest;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
@Service
public class PaymentService {
    @Value("${STRIPE_SECRET_KEY}")
    private String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }
    public String charge(PaymentRequest chargeRequest) throws StripeException {

        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", chargeRequest.getAmount());
        chargeParams.put("currency", "EUR");
        chargeParams.put("source", chargeRequest.getToken().getId());

        Charge charge = Charge.create(chargeParams);
        return charge.getId();
    }

}
