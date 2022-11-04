package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EditHotelDto {
    private String name;

    private String description;

    private String amenities;

    private String checkInHour;

    private String checkOutHour;

    private int stars;
}
