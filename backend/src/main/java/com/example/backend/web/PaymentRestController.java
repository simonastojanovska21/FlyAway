package com.example.backend.web;

import com.example.backend.model.payment.PaymentRequest;
import com.example.backend.service.BookingService;
import com.example.backend.service.impl.PaymentService;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
@RequestMapping("/api/payment")
public class PaymentRestController {
    private PaymentService service;
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<String> completePayment(@RequestBody PaymentRequest request) throws StripeException {
        String chargeId= service.charge(request);
        if(chargeId!= null)
        {
            //this.orderService.payForUserOrder(request.getUsername());
            this.bookingService.payForBookingForTrip(request.getBookingId());
            return new ResponseEntity<String>(chargeId, HttpStatus.OK);
        }
        return new ResponseEntity<String>("Please check the credit card details entered",HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public String handleError(StripeException ex) {
        return ex.getMessage();
    }
}
