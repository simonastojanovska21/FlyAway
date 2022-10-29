package com.example.backend.service.impl;

import com.example.backend.model.*;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.dto.TopOfferDto;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.exceptions.TripDoesNotExistException;
import com.example.backend.model.forms.TripForm;
import com.example.backend.repository.*;
import com.example.backend.service.DestinationService;
import com.example.backend.service.RoomService;
import com.example.backend.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
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
    private final DestinationService destinationService;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

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

    @Override
    public List<TopOfferDto> getTopThreeOffers() {
        List<Trip> trips = this.tripRepository.findAllByStartDateAfter(LocalDate.now());
        Collections.shuffle(trips);
        return trips.stream().map(trip -> {
                    Hotel hotel = trip.getTripInHotel();
                    Location location=hotel.getHotelLocation();
                    return new TopOfferDto(formatter.format(trip.getStartDate()),formatter.format(trip.getEndDate()),
                            getHotelImagesUrls(hotel.getId()).get(0),
                            location.getCity()+" - "+location.getCountry(),
                            hotel.getName(),hotel.getStars(),getMinimumPricePerNight(trip.getId()));
                }).collect(Collectors.toList());
    }

    @Override
    public List<TopOfferDto> getTopThreeOffersForDestination(String destination) {
        List<Trip> trips = this.tripRepository.findAllByStartDateAfterAndTripInHotel_HotelLocation_City(LocalDate.now(),destination);
        Collections.shuffle(trips);
        return trips.stream().map(trip -> {
            Hotel hotel = trip.getTripInHotel();
            Location location=hotel.getHotelLocation();
            return new TopOfferDto(formatter.format(trip.getStartDate()),formatter.format(trip.getEndDate()),
                    getHotelImagesUrls(hotel.getId()).get(0),
                    location.getCity()+" - "+location.getCountry(),
                    hotel.getName(),hotel.getStars(),getMinimumPricePerNight(trip.getId()));
        }).collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForDestination(String destination) {
        return this.tripRepository
                .findAllByTripInHotel_HotelLocation_CityOrTripInHotel_HotelLocation_Country(destination,destination)
                .stream().map(trip -> new TripDto(trip.getId().toString(),
                        trip.getStartDate(),trip.getEndDate(),
                        this.getMinimumPricePerNight(trip.getId()),trip.getTripInHotel(),
                        getHotelImagesUrls(trip.getTripInHotel().getId()),this.getHotelRating(trip.getTripInHotel().getId())))
                .collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForTime(String startTime, String endTime) {
        return this.tripRepository
                .findAllByStartDateAfterAndEndDateBefore(LocalDate.parse(startTime).minusDays(1), LocalDate.parse(endTime).plusDays(1))
                .stream().map(trip -> new TripDto(trip.getId().toString(),
                        trip.getStartDate(),trip.getEndDate(),
                        this.getMinimumPricePerNight(trip.getId()),trip.getTripInHotel(),
                        getHotelImagesUrls(trip.getTripInHotel().getId()),this.getHotelRating(trip.getTripInHotel().getId())))
                .collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForDestinationAndTime(String destination, String startTime, String endTime) {
        return this.tripRepository
                .findAllByStartDateAfterAndEndDateBefore(LocalDate.parse(startTime).minusDays(1), LocalDate.parse(endTime).plusDays(1))
                .stream().filter(trip->{
                    Location location = trip.getTripInHotel().getHotelLocation();
                    return location.getCity().equals(destination) || location.getCountry().equals(destination);
                }).map(trip -> new TripDto(trip.getId().toString(),
                        trip.getStartDate(),trip.getEndDate(),
                        this.getMinimumPricePerNight(trip.getId()),trip.getTripInHotel(),
                        getHotelImagesUrls(trip.getTripInHotel().getId()),this.getHotelRating(trip.getTripInHotel().getId())))
                .collect(Collectors.toList());
    }
}