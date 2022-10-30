package com.example.backend.service.impl;

import com.example.backend.model.Destination;
import com.example.backend.model.Location;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.dto.TouristAttractionDto;
import com.example.backend.model.forms.DestinationForm;
import com.example.backend.repository.DestinationRepository;
import com.example.backend.service.DestinationService;
import com.example.backend.service.LocationService;
import com.example.backend.service.QueryService;
import com.example.backend.utils.FormatHelper;
import lombok.AllArgsConstructor;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.example.backend.utils.SPARQLQueries.*;

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
    public DestinationDto getDestinationDetailsFromDbpedia(String city, String country) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingDbpediaSPARQLEndpoint(getDestinationDetails(city,country));
        QuerySolution querySolution = resultSet.nextSolution();
        String homepage = querySolution.get("homepage") == null ? "" : querySolution.get("homepage").toString();
        String currency = querySolution.get("currency") == null ? "" : querySolution.get("currency").asResource().getLocalName();
        String countryCode = querySolution.get("countryCode") == null ? "" : querySolution.get("countryCode").toString();
        return new DestinationDto(querySolution.get("abstract").toString().replace("@en",""), homepage,currency,countryCode);
    }

    @Override
    public List<TouristAttractionDto> getMuseumsForDestination(String city) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingOSMEndpoint(getMuseumsInDestinations(city));
        return this.getTouristAttractionsFromQueryResult(resultSet);
    }

    @Override
    public List<TouristAttractionDto> getAttractionsForDestination(String city) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingOSMEndpoint(getAttractionsInDestinations(city));
        return this.getTouristAttractionsFromQueryResult(resultSet);
    }

    @Override
    public List<TouristAttractionDto> getRestaurantsForDestination(String city) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingOSMEndpoint(getRestaurantsInDestinations(city));
        return this.getTouristAttractionsFromQueryResult(resultSet);
    }

    @Override
    public List<TouristAttractionDto> getBarsForDestination(String city) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingOSMEndpoint(getBarsInDestinations(city));
        return this.getTouristAttractionsFromQueryResult(resultSet);
    }

    @Override
    public List<TouristAttractionDto> getNightClubsForDestination(String city) {
        ResultSet resultSet = this.queryService
                .executeQueryUsingOSMEndpoint(getNightClubsInDestinations(city));
        return this.getTouristAttractionsFromQueryResult(resultSet);
    }

    private List<TouristAttractionDto> getTouristAttractionsFromQueryResult(ResultSet resultSet){
        List<TouristAttractionDto> touristAttractions=new ArrayList<>();
        resultSet.forEachRemaining(each->{
            String name = each.get("name").toString();
            String location = each.get("loc").toString();
            double [] coordinates = FormatHelper.getLocationCoordinates(location);
            String imageURL = each.get("imageURL").toString();
            String description = each.get("description").toString().replace("@en","");
            touristAttractions.add(new TouristAttractionDto(name,coordinates[1],coordinates[0],imageURL,description));
        });
        return touristAttractions;
    }

}
