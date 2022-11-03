package com.example.backend.repository;

import com.example.backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripRepository extends JpaRepository<Trip, UUID> {


    List<Trip> findAllByStartDateAfterOrderByStartDate(LocalDate startDate);

    List<Trip> findAllByStartDateAfterAndTripInHotel_HotelLocation_CityOrderByStartDate(LocalDate startDate, String city);

    List<Trip> findAllByStartDateAfterAndTripInHotel_HotelLocation_CityOrTripInHotel_HotelLocation_CountryOrderByStartDate(LocalDate startDate,String city, String country);

    List<Trip> findAllByStartDateAfterAndEndDateBeforeOrderByStartDate(LocalDate startDate, LocalDate endDate);

}
