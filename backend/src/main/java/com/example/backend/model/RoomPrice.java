package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class RoomPrice {

    @Id
    @GeneratedValue
    private UUID id;

    private String roomType;

    private double roomPrice;

    @ManyToOne
    private Trip roomPriceForTrip;

    public RoomPrice(String roomType, double roomPrice, Trip roomPriceForTrip) {
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.roomPriceForTrip = roomPriceForTrip;
    }
}
