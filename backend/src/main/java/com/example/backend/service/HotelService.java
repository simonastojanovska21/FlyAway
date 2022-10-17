package com.example.backend.service;

import com.example.backend.model.Hotel;
import com.example.backend.model.dto.HotelDto;

import java.util.Optional;

public interface HotelService {
    Optional<Hotel> addNewHotel(HotelDto hotelDto);
    void addHotelImage(String imageUrl, String imageTag, Hotel hotel);
    Optional<Hotel> getHotel(String hotelId);

}
