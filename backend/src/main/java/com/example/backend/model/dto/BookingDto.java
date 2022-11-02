package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class BookingDto {
    private String username;

    private String bookingId;

    private String destinationId;

    private String bookingStatus;

    private String hotelName;

    private String hotelCity;

    private double tripPrice;

    private LocalDate startDate;

    private LocalDate endDate;

    private String roomType;

    private int numberOfPeople;
}
