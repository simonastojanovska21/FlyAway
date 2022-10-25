package com.example.backend.model.dto;

import com.example.backend.model.Hotel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class TripDetailsDto {
    private String tripId;

    private LocalDate startDate;

    private LocalDate endDate;

    private int tripDuration;

    private Hotel tripInHotel;
}
