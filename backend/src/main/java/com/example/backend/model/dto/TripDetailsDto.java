package com.example.backend.model.dto;

import com.example.backend.model.Hotel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TripDetailsDto {
    private String tripId;

    private String startDate;

    private String endDate;

    private int tripDuration;

    private Hotel tripInHotel;
}
