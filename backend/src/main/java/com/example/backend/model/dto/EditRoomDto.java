package com.example.backend.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class EditRoomDto {

    private double pricePerNight;

    private int numberOfGuests;

    private String roomType;
}
