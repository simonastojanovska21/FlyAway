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
public class HotelImage {
    @Id
    @GeneratedValue
    private UUID id;

    private String url;

    @Enumerated(EnumType.STRING)
    private ImageTag imageTag;

    @ManyToOne
    private Hotel imageForHotel;

    public HotelImage(String url, ImageTag imageTag, Hotel imageForHotel) {
        this.url = url;
        this.imageTag=imageTag;
        this.imageForHotel = imageForHotel;
    }
}
