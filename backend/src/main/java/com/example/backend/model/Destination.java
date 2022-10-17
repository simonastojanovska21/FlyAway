package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Destination {
    @Id
    @GeneratedValue
    private UUID id;

    private String destinationName;

    private String destinationImage;

    @OneToOne
    private Location destinationLocation;

    public Destination(String destinationName, String destinationImage, Location destinationLocation) {
        this.destinationName = destinationName;
        this.destinationImage = destinationImage;
        this.destinationLocation = destinationLocation;
    }
}
