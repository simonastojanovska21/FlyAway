package com.example.backend.web;

import com.example.backend.model.Trip;
import com.example.backend.model.dto.OfferDto;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.forms.TripForm;
import com.example.backend.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/trips")
@AllArgsConstructor
public class TripRestController {

    private final TripService tripService;

    @GetMapping("/all")
    public List<TripDto> getAllTrips(){
        return this.tripService.getAllTrips();
    }

    @GetMapping("/tripsForDestination/{destination}")
    public List<TripDto> getAllTripsForDestination(@PathVariable String destination){
        return this.tripService.getTripsForDestination(destination);
    }

    @GetMapping("/tripsForDestinationAndTime/{destination}/{startTime}/{endTime}")
    public List<TripDto> tripsForDestinationAndTime(@PathVariable String destination,@PathVariable String startTime,
                                                    @PathVariable String endTime){
        return this.tripService.getTripsForDestinationAndTime(destination,startTime,endTime);
    }

    @GetMapping("/tripsForTime/{startTime}/{endTime}")
    public List<TripDto> tripsForTime(@PathVariable String startTime, @PathVariable String endTime){
        return this.tripService.getTripsForTime(startTime, endTime);
    }

    @GetMapping("/getTopThreeOffers")
    public List<OfferDto> getTopThreeOffers(){
        return this.tripService.getTopThreeOffers();
    }

    @GetMapping("/getTopThreeOffersForDestination/{destination}")
    public List<OfferDto> getTopThreeOffersForDestination(@PathVariable String destination){
        return this.tripService.getTopThreeOffersForDestination(destination);
    }

    @GetMapping("/details/{tripId}")
    public ResponseEntity<TripDetailsDto> getTripDetails(@PathVariable String tripId){
        return this.tripService.getTripDetails(tripId)
                .map(tripDetailsDto -> ResponseEntity.ok().body(tripDetailsDto))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PostMapping("/addNewTrip")
    public ResponseEntity<Trip> addNewTrip(@RequestBody TripForm tripForm){
        return this.tripService.addNewTrip(tripForm)
                .map(trip->ResponseEntity.ok().body(trip))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
