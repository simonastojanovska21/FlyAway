package com.example.backend.model.dto;

import lombok.Data;

import javax.persistence.ManyToOne;

@Data
public class RoomDto {
    private String roomNumber;

    private double pricePerNight;

    private int numberOfGuests;

    private String roomType;

    private String hotelId;
}
