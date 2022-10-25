package com.example.backend.model.dto;

import com.example.backend.model.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
public class TripDto {

    private String tripId;

    private LocalDate startTime;

    private LocalDate endTime;

    private double pricePerNight;

    private Hotel hotelForTrip;

    private List<String> hotelImages;

    private int hotelRating;
}
