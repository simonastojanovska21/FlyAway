package com.example.backend.model.forms;

import lombok.Data;

@Data
public class BookingForm {
    private String username;

    private String tripId;

    private String roomId;

    private double totalPrice;
}
