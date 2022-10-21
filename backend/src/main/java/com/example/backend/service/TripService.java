package com.example.backend.service;

import com.example.backend.model.Trip;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.forms.TripForm;

import java.util.List;
import java.util.Optional;

public interface TripService {
    Optional<Trip> addNewTrip(TripForm tripForm);
    void addRoomTypeAndPrice(String roomType, double price, Trip trip);
    List<TripDto> getAllTrips();
}
