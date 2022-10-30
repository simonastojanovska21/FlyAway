package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OfferDto {
    private String tripId;

    private String hotelId;

    private String startDate;

    private String endDate;

    private String imageUrl;

    private String location;

    private String hotelName;

    private int stars;

    private double pricePerNight;
}
