package com.example.backend.service;

import com.example.backend.model.Hotel;
import com.example.backend.model.dto.EditHotelDto;
import com.example.backend.model.dto.HotelNameIdDto;
import com.example.backend.model.dto.TripInHotelDetailsDto;
import com.example.backend.model.forms.HotelForm;
import com.example.backend.model.dto.HotelItem;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HotelService {
    Optional<Hotel> addNewHotel(HotelForm hotelForm);
    void addHotelImage(String imageUrl, Hotel hotel);
    List<String> getHotelImagesUrls(UUID hotelId);
    int getHotelRating(UUID hotelId);
    Optional<Hotel> getHotelDetails(String hotelId);
    List<HotelItem> getAdminHotelList();
    Optional<Hotel> updateHotel(String hotelId, EditHotelDto editHotelDto);
    boolean deleteHotel(String hotelId);
    List<HotelNameIdDto> getHotelsNameAndId();
    TripInHotelDetailsDto getTripInHotelDetails(String tripId,String hotelId);
}
