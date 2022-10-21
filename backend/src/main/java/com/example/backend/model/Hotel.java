package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Hotel {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(length = 2048)
    private String description;

    private String address;

    private String amenities;

    private String checkInHour;

    private String checkOutHour;

    private int stars;

    @OneToOne
    private Location hotelLocation;

    public Hotel(String name, String description, String address, String amenities, String checkInHour,
                 String checkOutHour, int stars,Location hotelLocation) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.amenities = amenities;
        this.checkInHour = checkInHour;
        this.checkOutHour = checkOutHour;
        this.stars=stars;
        this.hotelLocation = hotelLocation;
    }
}
