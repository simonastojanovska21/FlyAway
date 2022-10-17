package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue
    private UUID id;

    private Double latitude;

    private Double longitude;

    private String city;

    private String country;

    public Location(Double latitude, Double longitude, String city, String country) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
        this.country = country;
    }
}
