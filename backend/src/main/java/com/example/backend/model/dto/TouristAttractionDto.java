package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TouristAttractionDto {

    private String name;

    private double latitude;

    private double longitude;

    private String imageUrl;

    private String description;
}
