package com.example.backend.web;

import com.example.backend.model.dto.HotelNameIdDto;
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

    @PostMapping("/addNewTrip")
    public ResponseEntity<?> addNewTrip(@RequestBody TripForm tripForm){
        return this.tripService.addNewTrip(tripForm)
                .map(trip->ResponseEntity.ok().body(trip))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
