package com.example.backend.service;

import com.example.backend.model.Location;
import com.example.backend.model.dto.LocationDto;

import java.util.Optional;

public interface LocationService {
    //Optional<Location> addNewLocation(LocationDto locationDto);
    Location addNewLocation(double latitude, double longitude, String city, String country);
}
