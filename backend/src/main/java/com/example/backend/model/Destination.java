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

    private String destinationImage;

    private String destinationThumbnail;

    @OneToOne
    private Location destinationLocation;

    public Destination( String destinationImage, String destinationThumbnail, Location destinationLocation) {
        this.destinationImage = destinationImage;
        this.destinationThumbnail = destinationThumbnail;
        this.destinationLocation = destinationLocation;
    }
}
