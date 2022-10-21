package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.RoomPrice;
import com.example.backend.model.Trip;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.forms.TripForm;
import com.example.backend.repository.HotelRepository;
import com.example.backend.repository.RoomPriceRepository;
import com.example.backend.repository.TripRepository;
import com.example.backend.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final RoomPriceRepository roomPriceRepository;
    private final HotelRepository hotelRepository;

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
    public void addRoomTypeAndPrice(String roomType, double price, Trip trip) {
        this.roomPriceRepository.save(new RoomPrice(roomType,price,trip));
    }

    @Override
    public List<TripDto> getAllTrips() {
        return null;
    }
}
