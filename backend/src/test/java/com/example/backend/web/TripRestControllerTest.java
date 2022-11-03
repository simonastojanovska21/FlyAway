package com.example.backend.web;

import com.example.backend.service.TripService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TripRestControllerTest {

    @InjectMocks
    TripRestController tripRestController;

    @Mock
    TripService tripService;

    @Test
    void getAllTrips() {
    }

    @Test
    void getAllTripsForDestination() {
    }

    @Test
    void tripsForDestinationAndTime() {
    }

    @Test
    void tripsForTime() {
    }

    @Test
    void getTopThreeOffers() {
    }

    @Test
    void getTopThreeOffersForDestination() {
    }

    @Test
    void getTripDetails() {
    }

    @Test
    void addNewTrip() {
    }
}