package com.example.backend.web;

import com.example.backend.model.Hotel;
import com.example.backend.model.dto.EditHotelDto;
import com.example.backend.model.dto.HotelNameIdDto;
import com.example.backend.model.dto.TripInHotelDetailsDto;
import com.example.backend.model.forms.HotelForm;
import com.example.backend.model.dto.HotelItem;
import com.example.backend.model.enumerations.Amenities;
import com.example.backend.service.HotelService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hotels")
@AllArgsConstructor
public class HotelRestController {

    private final HotelService hotelService;

    @GetMapping("/hotelData")
    public List<String> getHotelAmenities(){
        return Arrays.stream(Amenities.values()).map(each->each.label).collect(Collectors.toList());
    }

    @GetMapping("/adminHotelList")
    public List<HotelItem> getAdminHotelList(){
        return this.hotelService.getAdminHotelList();
    }

    @GetMapping("/details/{hotelId}")
    public ResponseEntity<Hotel> getDetailsAboutHotel(@PathVariable String hotelId){
        return this.hotelService.getHotelDetails(hotelId)
                .map(hotel -> ResponseEntity.ok().body(hotel))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @GetMapping("/getHotelsNameAndId")
    public List<HotelNameIdDto> getHotelsNameAndId(){
        return this.hotelService.getHotelsNameAndId();
    }

    @GetMapping("/getTripInHotelDetails/{tripId}/{hotelId}")
    public TripInHotelDetailsDto getTripInHotelDetails(@PathVariable String tripId,@PathVariable String hotelId){
        return this.hotelService.getTripInHotelDetails(tripId,hotelId);
    }

    @PostMapping("/addHotel")
    public ResponseEntity<Hotel> addNewHotel(@RequestBody HotelForm hotelForm){
        return this.hotelService.addNewHotel(hotelForm)
                .map(hotel->ResponseEntity.ok().body(hotel))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PutMapping("/edit/{hotelId}")
    public ResponseEntity<Hotel> editHotel(@PathVariable String hotelId, @RequestBody EditHotelDto editHotelDto){
        return this.hotelService.updateHotel(hotelId,editHotelDto)
                .map(hotel -> ResponseEntity.ok().body(hotel))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
