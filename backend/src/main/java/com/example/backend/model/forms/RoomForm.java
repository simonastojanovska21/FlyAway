package com.example.backend.model.forms;

import lombok.Data;

import java.util.List;

@Data
public class RoomForm {
    private int numberOfAvailableRooms;

    private double pricePerNight;

    private int numberOfGuests;

    private String roomType;

    private String hotelId;

    private List<String> imagesUrl;
}
