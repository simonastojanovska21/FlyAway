package com.example.backend.service;

import com.example.backend.model.Location;
import java.util.Optional;

public interface LocationService {
    Location addNewLocation(double latitude, double longitude, String city, String country);
}
