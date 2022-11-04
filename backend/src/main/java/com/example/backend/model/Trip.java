package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue
    private UUID id;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne
    private Hotel tripInHotel;

    public Trip(LocalDate startDate, LocalDate endDate, Hotel tripInHotel) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.tripInHotel = tripInHotel;
    }
}
