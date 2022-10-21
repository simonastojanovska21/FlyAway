package com.example.backend.model.dto;


import lombok.Data;


@Data
public class EditRoomDto {

    private double pricePerNight;

    private int numberOfGuests;

    private String roomType;
}
