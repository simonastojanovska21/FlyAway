package com.example.backend.model.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class HotelItem {
    private UUID hotelId;

    private String hotelName;

    private String hotelCity;


}
