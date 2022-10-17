package com.example.backend.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class HotelDto {
    private String name;

    private String description;

    private String address;

    private String city;

    private String country;

    private String amenities;

    private String checkInHour;

    private String checkOutHour;

    private double latitude;

    private double longitude;

    private List<ImageDto> imagesUrl;
}
