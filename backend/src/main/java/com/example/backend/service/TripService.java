package com.example.backend.service;

import com.example.backend.model.Trip;
import com.example.backend.model.dto.OfferDto;
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
    double getMinimumPricePerNight(UUID tripId);
    Optional<TripDetailsDto> getTripDetails(String tripId);
    List<OfferDto> getTopThreeOffers();
    List<OfferDto> getTopThreeOffersForDestination(String destination);
    List<TripDto> getAllTrips();
    List<TripDto> getTripsForDestination(String destinationId);
    List<TripDto> getTripsForTime(String startTime, String endTime);
    List<TripDto> getTripsForDestinationAndTime(String destination, String startTime, String endTime);
}
