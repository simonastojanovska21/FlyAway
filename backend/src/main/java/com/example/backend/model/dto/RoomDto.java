package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoomDto {

    private String roomId;

    private String roomType;

    private int numberOfGuests;

    private boolean available;

    private double pricePerNightForTrip;

    private List<String> roomImages;
}
