package com.example.backend.service.impl;

import com.example.backend.model.Location;
import com.example.backend.repository.LocationRepository;
import com.example.backend.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;


    @Override
    public Location addNewLocation(double latitude, double longitude,String city, String country) {
        return this.locationRepository.save(new Location(latitude,longitude,city,country));
    }
}
