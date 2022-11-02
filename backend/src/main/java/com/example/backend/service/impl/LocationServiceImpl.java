package com.example.backend.service.impl;

import com.example.backend.model.Location;
import com.example.backend.repository.LocationRepository;
import com.example.backend.service.LocationService;
import com.example.backend.service.QueryService;
import com.example.backend.utils.FormatHelper;
import com.example.backend.utils.SPARQLQueries;
import lombok.AllArgsConstructor;
import org.apache.jena.query.QuerySolution;
import org.apache.jena.query.ResultSet;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository locationRepository;
    private final QueryService queryService;

    @Override
    public Location addNewLocation(double latitude, double longitude,String city, String country) {
        return this.locationRepository.save(new Location(latitude,longitude,city,country));
    }

    @Override
    public Location addNewLocationForDestination(String city, String country) {
        if(city.equals("Chicago"))
            city = "Chicago, Illinois";
        ResultSet resultSet = this.queryService
                .executeQueryUsingDbpediaSPARQLEndpoint(SPARQLQueries.getCoordinatesForDestinationLocation(city,country));
        QuerySolution querySolution = resultSet.nextSolution();
        double latitude = querySolution.get("latitude").asLiteral().getDouble();
        double longitude = querySolution.get("longitude").asLiteral().getDouble();
        return this.locationRepository.save(new Location(latitude,longitude,city,country));
    }
}
