package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelImage;
import com.example.backend.model.Location;
import com.example.backend.model.dto.HotelDto;
import com.example.backend.model.enumerations.ImageTag;
import com.example.backend.repository.HotelImageRepository;
import com.example.backend.repository.HotelRepository;
import com.example.backend.service.HotelService;
import com.example.backend.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImagesRepository;
    private final LocationService locationService;
    @Override
    public Optional<Hotel> addNewHotel(HotelDto hotelDto) {
        Location location = this.locationService.addNewLocation(hotelDto.getLatitude(),hotelDto.getLongitude(),
                hotelDto.getCity(), hotelDto.getCountry());

        Hotel hotel = this.hotelRepository.save(new Hotel(hotelDto.getName(),hotelDto.getDescription(),
                hotelDto.getAddress(), hotelDto.getAmenities(), hotelDto.getCheckInHour(),
                hotelDto.getCheckOutHour(),location));
        hotelDto.getImagesUrl().forEach(imageDto -> this.addHotelImage(imageDto.getImageUrl(),imageDto.getImageTag(),hotel));
        return Optional.of(hotel);
    }

    @Override
    public void addHotelImage(String imageUrl, String imageTag, Hotel hotel) {
        HotelImage hotelImage = new HotelImage(imageUrl, ImageTag.valueOf(imageTag),hotel);
        this.hotelImagesRepository.save(hotelImage);
    }

    @Override
    public Optional<Hotel> getHotel(String hotelId) {
        return this.hotelRepository.findById(UUID.fromString(hotelId));
    }
}
