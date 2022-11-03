package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BookingForm {
    private String username;

    private String tripId;

    private String roomId;

    private double totalPrice;
}
