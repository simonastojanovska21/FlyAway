package com.example.backend.service.impl;

import com.example.backend.model.Destination;
import com.example.backend.model.Location;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.dto.MuseumDto;
import com.example.backend.model.forms.DestinationForm;
import com.example.backend.repository.DestinationRepository;
import com.example.backend.service.DestinationService;
import com.example.backend.service.LocationService;
import com.example.backend.service.QueryService;
import com.example.backend.utils.SPARQLQueries;
import lombok.AllArgsConstructor;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.example.backend.utils.SPARQLQueries.getDestinationDetails;

@Service
@AllArgsConstructor
public class DestinationServiceImpl implements DestinationService {

    private final DestinationRepository destinationRepository;
    private final LocationService locationService;
    private final QueryService queryService;

    @Override
    public Optional<Destination> addNewDestination(DestinationForm destinationForm) {
        Location location = this.locationService.addNewLocationForDestination(destinationForm.getCity(),
                destinationForm.getCountry());
        Destination destination = new Destination(destinationForm.getDestinationImage(),destinationForm.getDestinationThumbnail(),
                location);
        return Optional.of(this.destinationRepository.save(destination));
    }

    @Override
    public List<Destination> getAllDestinations() {
        return this.destinationRepository.findAll();
    }

    @Override
    public List<Destination> findTopThreeDestinations() {
        return this.destinationRepository.findThreeTopDestinations();
    }

    @Override
    public Optional<Destination> getDestination(String destinationId) {
        return this.destinationRepository.findById(UUID.fromString(destinationId));
    }

    @Override
    public DestinationDto getDestinationDetailsFromDbpedia(String destinationId) {
        Destination destination = this.getDestination(destinationId).get();
        ResultSet resultSet = this.queryService
                .executeQueryUsingDbpediaSPARQLEndpoint(getDestinationDetails(destination.getDestinationLocation().getCity(),
                        destination.getDestinationLocation().getCountry()));
        QuerySolution querySolution = resultSet.nextSolution();
        String homepage = querySolution.get("homepage") == null ? "" : querySolution.get("homepage").toString();
        String currency = querySolution.get("currency") == null ? "" : querySolution.get("currency").asResource().getLocalName();
        String countryCode = querySolution.get("countryCode") == null ? "" : querySolution.get("countryCode").toString();
        return new DestinationDto(querySolution.get("abstract").toString(), homepage,currency,countryCode);
    }

    @Override
    public List<MuseumDto> getMuseumsForDestination(String destinationId) {
        return null;
    }
}
