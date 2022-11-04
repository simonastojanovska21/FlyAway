package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.Map;

@Data
@AllArgsConstructor
public class TripForm {
    private String hotelId;

    private Map<String, Double> roomTypePrice;

    private LocalDate startDate;

    private LocalDate endDate;
}
