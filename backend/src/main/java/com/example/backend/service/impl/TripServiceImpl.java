package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelImage;
import com.example.backend.model.RoomPrice;
import com.example.backend.model.Trip;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.exceptions.TripDoesNotExistException;
import com.example.backend.model.forms.TripForm;
import com.example.backend.repository.*;
import com.example.backend.service.RoomService;
import com.example.backend.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final RoomPriceRepository roomPriceRepository;
    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImageRepository;
    private final HotelReviewRepository hotelReviewRepository;
    private final RoomService roomService;

    @Override
    public Optional<Trip> addNewTrip(TripForm tripForm) {
        Hotel hotel = this.hotelRepository.findById(UUID.fromString(tripForm.getHotelId()))
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + tripForm.getHotelId()
                        +" is not found"));
        Trip trip = this.tripRepository.save(new Trip(tripForm.getStartDate(),tripForm.getEndDate(),hotel));
        tripForm.getRoomTypePrice().forEach((key,value)->this.addRoomTypeAndPrice(key,value,trip));
        return Optional.of(trip);
    }

    @Override
    public Optional<Trip> getTrip(String tripId) {
        return this.tripRepository.findById(UUID.fromString(tripId));
    }

    @Override
    public void addRoomTypeAndPrice(String roomType, double price, Trip trip) {
        this.roomPriceRepository.save(new RoomPrice(roomType,price,trip));
    }

    @Override
    public List<TripDto> getAllTrips() {
        return this.tripRepository.findAll().stream().map(trip -> new TripDto(trip.getId().toString(),
                        trip.getStartDate(),trip.getEndDate(),
                this.getMinimumPricePerNight(trip.getId()),trip.getTripInHotel(),
                getHotelImagesUrls(trip.getTripInHotel().getId()),this.getHotelRating(trip.getTripInHotel().getId())))
                .collect(Collectors.toList());
    }

    @Override
    public double getMinimumPricePerNight(UUID tripId) {
        return this.roomPriceRepository.findFirstByRoomPriceForTrip_IdOrderByRoomPrice(tripId).getRoomPrice();
    }

    @Override
    public List<String> getHotelImagesUrls(UUID hotelId) {
        return this.hotelImageRepository.findAllByImageForHotel_Id(hotelId)
                .stream().map(HotelImage::getUrl).collect(Collectors.toList());
    }

    @Override
    public int getHotelRating(UUID hotelId) {
        Double rating = this.hotelReviewRepository.getAverageRatingOfHotel(hotelId);
        if(rating==null)
            return 0;
        return (int) Math.round(rating);
    }

    @Override
    public Optional<TripDetailsDto> getTripDetails(String tripId) {
        Trip trip = this.tripRepository.findById(UUID.fromString(tripId))
                .orElseThrow(()->new TripDoesNotExistException("Trip with id "+tripId+" does not exist"));
        TripDetailsDto tripDetailsDto = new TripDetailsDto();
        tripDetailsDto.setTripId(tripId);
        tripDetailsDto.setStartDate(trip.getStartDate());
        tripDetailsDto.setEndDate(trip.getEndDate());
        int duration= (int) (Math.abs(ChronoUnit.DAYS.between(trip.getEndDate(), trip.getStartDate())) + 1);
        tripDetailsDto.setTripDuration(duration);
        tripDetailsDto.setTripInHotel(trip.getTripInHotel());
        return Optional.of(tripDetailsDto);
    }


}
