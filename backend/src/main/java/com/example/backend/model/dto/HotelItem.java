package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;
import java.util.UUID;

@Data
@AllArgsConstructor
public class HotelItem {

    private UUID hotelId;

    private String hotelName;

    private String hotelCity;

    private Map<String,Integer> roomTypesCount;
}
