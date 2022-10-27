package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class WeatherDto {
    private String  date;
    private int dayTemperature;
    private int nightTemperature;
    private String weatherDescription;
    private String icon;
}
