package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HotelForm {
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

    private int stars;

    private List<String> imagesUrl;
}
