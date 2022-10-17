package com.example.backend.model;

import com.example.backend.model.enumerations.ImageTag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class DestinationImage {
    @Id
    @GeneratedValue
    private UUID id;

    private String url;

    private ImageTag imageTag;

    @ManyToOne
    private Destination imageForDestination;

    public DestinationImage(String url, ImageTag imageTag, Destination imageForDestination) {
        this.url = url;
        this.imageTag=imageTag;
        this.imageForDestination = imageForDestination;
    }
}
