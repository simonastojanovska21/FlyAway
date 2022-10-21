package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelImage;
import com.example.backend.model.Location;
import com.example.backend.model.dto.EditHotelDto;
import com.example.backend.model.dto.HotelNameIdDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.forms.HotelForm;
import com.example.backend.model.dto.HotelItem;
import com.example.backend.model.enumerations.ImageTag;
import com.example.backend.repository.HotelImageRepository;
import com.example.backend.repository.HotelRepository;
import com.example.backend.service.HotelService;
import com.example.backend.service.LocationService;
import com.example.backend.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImagesRepository;
    private final LocationService locationService;
    private final RoomService roomService;
    @Override
    public Optional<Hotel> addNewHotel(HotelForm hotelForm) {
        Location location = this.locationService.addNewLocation(hotelForm.getLatitude(), hotelForm.getLongitude(),
                hotelForm.getCity(), hotelForm.getCountry());

        Hotel hotel = this.hotelRepository.save(new Hotel(hotelForm.getName(), hotelForm.getDescription(),
                hotelForm.getAddress(), hotelForm.getAmenities(), hotelForm.getCheckInHour(),
                hotelForm.getCheckOutHour(), hotelForm.getStars(),location));
        hotelForm.getImagesUrl().forEach(imageDto -> this.addHotelImage(imageDto.getImageUrl(),imageDto.getImageTag(),hotel));
        return Optional.of(hotel);
    }

    @Override
    public void addHotelImage(String imageUrl, String imageTag, Hotel hotel) {
        HotelImage hotelImage = new HotelImage(imageUrl, ImageTag.valueOf(imageTag),hotel);
        this.hotelImagesRepository.save(hotelImage);
    }

    @Override
    public Optional<Hotel> getHotelDetails(String hotelId) {
        return this.hotelRepository.findById(UUID.fromString(hotelId));
    }

    @Override
    public List<HotelItem> getAdminHotelList() {
        return this.hotelRepository.findAll().stream()
                .map(hotel -> new HotelItem(hotel.getId(),hotel.getName(),hotel.getHotelLocation().getCity(),
                        roomService.countRoomsByRoomType(hotel.getId())))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Hotel> updateHotel(String hotelId, EditHotelDto editHotelDto) {
        Hotel hotel=this.getHotelDetails(hotelId)
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + hotelId +" is not found"));
        hotel.setName(editHotelDto.getName());
        hotel.setDescription(editHotelDto.getDescription());
        hotel.setAmenities(editHotelDto.getAmenities());
        hotel.setCheckInHour(editHotelDto.getCheckInHour());
        hotel.setCheckOutHour(editHotelDto.getCheckOutHour());
        hotel.setStars(editHotelDto.getStars());
        return Optional.of(this.hotelRepository.save(hotel));
    }

    @Override
    public boolean deleteHotel(String hotelId) {
        this.hotelRepository.deleteById(UUID.fromString(hotelId));
        return this.hotelRepository.findById(UUID.fromString(hotelId)).isEmpty();
    }

    @Override
    public List<HotelNameIdDto> getHotelsNameAndId() {
        return this.hotelRepository.findAll().stream()
                .map(hotel -> new HotelNameIdDto(hotel.getId().toString(),hotel.getName()))
                .collect(Collectors.toList());
    }
}
