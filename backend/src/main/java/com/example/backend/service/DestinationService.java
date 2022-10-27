package com.example.backend.service;

import com.example.backend.model.Destination;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.dto.MuseumDto;
import com.example.backend.model.forms.DestinationForm;

import java.util.List;
import java.util.Optional;

public interface DestinationService {
    Optional<Destination> addNewDestination(DestinationForm destinationForm);
    List<Destination> getAllDestinations();
    List<Destination> findTopThreeDestinations();
    Optional<Destination> getDestination(String destinationId);
    DestinationDto getDestinationDetailsFromDbpedia(String destinationId);
    List<MuseumDto> getMuseumsForDestination(String destinationId);
}
