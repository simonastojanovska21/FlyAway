package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RoomForm {
    private int numberOfAvailableRooms;

    private double pricePerNight;

    private int numberOfGuests;

    private String roomType;

    private String hotelId;

    private List<String> imagesUrl;
}
