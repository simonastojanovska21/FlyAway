package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private double price;

    @ManyToOne
    private Destination tripForDestination;

    @ManyToOne
    private Hotel tripInHotel;

    public Trip(LocalDateTime startDate, LocalDateTime endDate, double price, Destination tripForDestination, Hotel tripInHotel) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.tripForDestination = tripForDestination;
        this.tripInHotel = tripInHotel;
    }
}
