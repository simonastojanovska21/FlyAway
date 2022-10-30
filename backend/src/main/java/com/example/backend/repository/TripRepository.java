package com.example.backend.repository;

import com.example.backend.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TripRepository extends JpaRepository<Trip, UUID> {
//    @Query(nativeQuery = true,value = "select * from trip t order by random() limit 3")
//    List<Trip> findTopThreeOffers();
//
//    @Query(nativeQuery = true, value = "select * from trip t join hotel h on h.id = t.trip_in_hotel_id \n" +
//            "    join location l on l.id = h.hotel_location_id\n" +
//            "    where l.city='Skopje' \n" +
//            "    order by random() limit 3")
//    List<Trip> findTripsForDestination

    List<Trip> findAllByStartDateAfter(LocalDate startDate);

    List<Trip> findAllByStartDateAfterAndTripInHotel_HotelLocation_City(LocalDate startDate, String city);

    List<Trip> findAllByTripInHotel_HotelLocation_CityOrTripInHotel_HotelLocation_Country(String city, String country);

    List<Trip> findAllByStartDateAfterAndEndDateBefore(LocalDate startDate, LocalDate endDate);

    List<Trip> findAllByTripInHotel_HotelLocation_CityOrTripInHotel_HotelLocation_CountryAndStartDateAfterAndEndDateBefore(String city, String country, LocalDate startDate, LocalDate endDate);
}
