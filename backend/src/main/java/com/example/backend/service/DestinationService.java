package com.example.backend.service;

import com.example.backend.model.Destination;
import com.example.backend.model.dto.TouristAttractionDto;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.forms.DestinationForm;

import java.util.List;
import java.util.Optional;

public interface DestinationService {
    Optional<Destination> addNewDestination(DestinationForm destinationForm);
    List<Destination> getAllDestinations();
    List<Destination> findTopThreeDestinations();
    Optional<Destination> getDestination(String destinationId);
    DestinationDto getDestinationDetailsFromDbpedia(String city, String country);
    List<TouristAttractionDto> getMuseumsForDestination(String city);
    List<TouristAttractionDto> getAttractionsForDestination(String city);
    List<TouristAttractionDto> getRestaurantsForDestination(String city);
    List<TouristAttractionDto> getBarsForDestination(String city);
    List<TouristAttractionDto> getNightClubsForDestination(String city);

}
