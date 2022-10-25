package com.example.backend.service;

import com.example.backend.model.Trip;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.forms.TripForm;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TripService {
    Optional<Trip> addNewTrip(TripForm tripForm);
    Optional<Trip> getTrip(String tripId);
    void addRoomTypeAndPrice(String roomType, double price, Trip trip);
    List<TripDto> getAllTrips();
    double getMinimumPricePerNight(UUID tripId);
    List<String> getHotelImagesUrls(UUID hotelId);
    int getHotelRating(UUID hotelId);
    Optional<TripDetailsDto> getTripDetails(String tripId);

}
