package com.example.backend.service;

import com.example.backend.model.dto.WeatherDto;

import java.io.IOException;
import java.util.List;

public interface OpenWeatherService {
    List<WeatherDto> getWeatherConditionsAboutDestination(String destinationId) throws IOException, InterruptedException;
}
