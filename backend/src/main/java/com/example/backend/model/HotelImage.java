package com.example.backend.model;

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

    @ManyToOne
    private Hotel imageForHotel;

    public HotelImage(String url, Hotel imageForHotel) {
        this.url = url;
        this.imageForHotel = imageForHotel;
    }
}
