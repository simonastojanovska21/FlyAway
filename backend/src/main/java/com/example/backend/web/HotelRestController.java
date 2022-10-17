package com.example.backend.web;

import com.example.backend.model.dto.HotelDto;
import com.example.backend.model.enumerations.Amenities;
import com.example.backend.model.enumerations.ImageTag;
import com.example.backend.service.HotelService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hotels")
@AllArgsConstructor
public class HotelRestController {

    private final HotelService hotelService;

    @GetMapping("/hotelData")
    public Map<String,List<String>> getHotelAmenities(){
        Map<String,List<String>> map = new HashMap<>();
        map.put("amenities",Arrays.stream(Amenities.values()).map(each->each.label).collect(Collectors.toList()));
        map.put("imageTags",Arrays.stream(ImageTag.values()).map(Enum::toString).collect(Collectors.toList()));
        return map;
    }
    @PostMapping("/addHotel")
    public ResponseEntity<?> addNewHotel(@RequestBody HotelDto hotelDto){
        return this.hotelService.addNewHotel(hotelDto)
                .map(hotel->ResponseEntity.ok().body(hotel))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

}
