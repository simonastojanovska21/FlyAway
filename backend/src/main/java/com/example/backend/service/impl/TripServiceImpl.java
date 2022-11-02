package com.example.backend.service.impl;

import com.example.backend.model.*;
import com.example.backend.model.dto.OfferDto;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.exceptions.TripDoesNotExistException;
import com.example.backend.model.forms.TripForm;
import com.example.backend.repository.*;
import com.example.backend.service.DestinationService;
import com.example.backend.service.HotelService;
import com.example.backend.service.TripService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TripServiceImpl implements TripService {

    private final TripRepository tripRepository;
    private final RoomPriceRepository roomPriceRepository;
    private final HotelService hotelService;

    private static final DateTimeFormatter formatterForDatabaseData = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter formatterForReceivedData = DateTimeFormatter.ofPattern("dd-MM-yyyy");

    @Override
    public Optional<Trip> addNewTrip(TripForm tripForm) {
        Hotel hotel = this.hotelService.getHotelDetails(tripForm.getHotelId())
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
    public double getMinimumPricePerNight(UUID tripId) {
        return this.roomPriceRepository.findFirstByRoomPriceForTrip_IdOrderByRoomPrice(tripId).getRoomPrice();
    }

    @Override
    public Optional<TripDetailsDto> getTripDetails(String tripId) {
        Trip trip = this.tripRepository.findById(UUID.fromString(tripId))
                .orElseThrow(()->new TripDoesNotExistException("Trip with id "+tripId+" does not exist"));
        TripDetailsDto tripDetailsDto = new TripDetailsDto();
        tripDetailsDto.setTripId(tripId);
        tripDetailsDto.setStartDate(trip.getStartDate().format(formatterForDatabaseData));
        tripDetailsDto.setEndDate(trip.getEndDate().format(formatterForDatabaseData));
        int duration= (int) (Math.abs(ChronoUnit.DAYS.between(trip.getEndDate(), trip.getStartDate())) + 1);
        tripDetailsDto.setTripDuration(duration);
        tripDetailsDto.setTripInHotel(trip.getTripInHotel());
        return Optional.of(tripDetailsDto);
    }

    @Override
    public List<OfferDto> getTopThreeOffers() {
        List<Trip> trips = this.tripRepository.findAllByStartDateAfterOrderByStartDate(LocalDate.now());
        return this.getNRandomOffers(trips,3);
    }

    @Override
    public List<OfferDto> getTopThreeOffersForDestination(String destination) {
        List<Trip> trips = this.tripRepository.findAllByStartDateAfterAndTripInHotel_HotelLocation_CityOrderByStartDate(LocalDate.now(),destination);
        return this.getNRandomOffers(trips,3);
    }

    @Override
    public List<TripDto> getAllTrips() {
        return this.tripRepository.findAll()
                .stream().sorted(Comparator.comparing(Trip::getStartDate))
                .map(this::getTripDtoFromTrip)
                .collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForDestination(String destination) {
        return this.tripRepository
                .findAllByTripInHotel_HotelLocation_CityOrTripInHotel_HotelLocation_CountryOrderByStartDate(destination,destination)
                .stream().map(this::getTripDtoFromTrip)
                .collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForTime(String startTime, String endTime) {
        return this.tripRepository
                .findAllByStartDateAfterAndEndDateBeforeOrderByStartDate(LocalDate.parse(startTime,formatterForReceivedData).minusDays(1),
                        LocalDate.parse(endTime,formatterForReceivedData).plusDays(1))
                .stream().map(this::getTripDtoFromTrip)
                .collect(Collectors.toList());
    }

    @Override
    public List<TripDto> getTripsForDestinationAndTime(String destination, String startTime, String endTime) {
        return this.tripRepository
                .findAllByStartDateAfterAndEndDateBeforeOrderByStartDate(LocalDate.parse(startTime,formatterForReceivedData).minusDays(1),
                        LocalDate.parse(endTime,formatterForReceivedData).plusDays(1))
                .stream().filter(trip->{
                    Location location = trip.getTripInHotel().getHotelLocation();
                    return location.getCity().equals(destination) || location.getCountry().equals(destination);})
                .map(this::getTripDtoFromTrip)
                .collect(Collectors.toList());
    }

    private TripDto getTripDtoFromTrip(Trip trip){
        return new TripDto(trip.getId().toString(),
                trip.getStartDate().format(formatterForDatabaseData),
                trip.getEndDate().format(formatterForDatabaseData),
                this.getMinimumPricePerNight(trip.getId()),trip.getTripInHotel(),
                this.hotelService.getHotelImagesUrls(trip.getTripInHotel().getId()),
                this.hotelService.getHotelRating(trip.getTripInHotel().getId()));
    }

    private List<OfferDto> getNRandomOffers(List<Trip> trips, int N){
        if(trips.size()<= N)
            return trips.stream().map(this::getOfferDtoFromTrip).collect(Collectors.toList());
        Collections.shuffle(trips);
        return trips.subList(0,N).stream().map(this::getOfferDtoFromTrip).collect(Collectors.toList());
    }

    private OfferDto getOfferDtoFromTrip(Trip trip){
        Hotel hotel = trip.getTripInHotel();
        Location location=hotel.getHotelLocation();
        String formattedLocation = location.getCity().split(",")[0] + " - ";
        String tmp = location.getCountry().equals("United States of America") ? "USA" : location.getCountry();
        formattedLocation+=tmp;
        return new OfferDto(trip.getId().toString(),hotel.getId().toString(),
                trip.getStartDate().format(formatterForDatabaseData),
                trip.getEndDate().format(formatterForDatabaseData),
                this.hotelService.getHotelImagesUrls(hotel.getId()).get(0),
                formattedLocation,
                hotel.getName(),hotel.getStars(),getMinimumPricePerNight(trip.getId()));
    }
}