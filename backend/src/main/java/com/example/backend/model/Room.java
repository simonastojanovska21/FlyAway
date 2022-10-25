package com.example.backend.model;

import com.example.backend.model.enumerations.RoomType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Room {

    @Id
    @GeneratedValue
    private UUID id;

    private int numberOfAvailableRooms;

    private double pricePerNight;

    private int numberOfGuests;

    @Enumerated(value = EnumType.STRING)
    private RoomType roomType;

    @ManyToOne
    private Hotel roomInHotel;

    public Room(int numberOfAvailableRooms, double pricePerNight, int numberOfGuests, RoomType roomType, Hotel roomInHotel) {
        this.numberOfAvailableRooms = numberOfAvailableRooms;
        this.pricePerNight = pricePerNight;
        this.numberOfGuests = numberOfGuests;
        this.roomType = roomType;
        this.roomInHotel = roomInHotel;
    }
}
