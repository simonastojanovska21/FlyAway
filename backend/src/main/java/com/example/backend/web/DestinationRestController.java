package com.example.backend.web;

import com.example.backend.model.Destination;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.dto.MuseumDto;
import com.example.backend.model.dto.WeatherDto;
import com.example.backend.model.forms.DestinationForm;
import com.example.backend.service.DestinationService;
import com.example.backend.service.OpenWeatherService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/destinations")
@AllArgsConstructor
public class DestinationRestController {

    private final DestinationService destinationService;
    private final OpenWeatherService openWeatherService;

    @GetMapping("/getAllDestinations")
    public List<Destination> getAllDestinations(){
        return this.destinationService.getAllDestinations();
    }

    @GetMapping("/getTopThreeDestinations")
    public List<Destination> getTopThreeDestinations(){
        return this.destinationService.findTopThreeDestinations();
    }

    @GetMapping("/getDestinationDetails/{destinationId}")
    public ResponseEntity<Destination> getDestinationDetails(@PathVariable String destinationId){
        return this.destinationService.getDestination(destinationId)
                .map(destination -> ResponseEntity.ok().body(destination))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @GetMapping("/getWeatherConditions/{destinationId}")
    public List<WeatherDto> getWeatherConditions(@PathVariable String destinationId) throws IOException, InterruptedException {
        return this.openWeatherService.getWeatherConditionsAboutDestination(destinationId);
    }

    @GetMapping("/getDestinationDetailsFromDbpedia/{destinationId}")
    public DestinationDto getDestinationDetailsFromDbpedia(@PathVariable String destinationId){
        return this.destinationService.getDestinationDetailsFromDbpedia(destinationId);
    }

    @GetMapping("/getMuseumsForDestination/{destinationId}")
    public List<MuseumDto> getMuseumsForDestination(@PathVariable String destinationId){
        return this.destinationService.getMuseumsForDestination(destinationId);
    }

//    @GetMapping("/getAllCountries")
//    public List<String> getAllCountries(){
//        return this.destinationService.getAllCountries();
//    }
//
//    @GetMapping("/getAllCitiesInCountry/{country}")
//    public List<String> getAllCitiesInCountry(@PathVariable String country){
//        return this.destinationService.getAllCitiesInCountry(country);
//    }

    @PostMapping("/addNewDestination")
    public ResponseEntity<Destination> addNewDestination(@RequestBody DestinationForm destinationForm){
        return this.destinationService.addNewDestination(destinationForm)
                .map(destination -> ResponseEntity.ok().body(destination))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
