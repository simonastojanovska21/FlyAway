package com.example.backend.repository;

import com.example.backend.model.HotelReview;
import com.example.backend.model.Trip;
import com.example.backend.model.dto.TopOfferDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TripRepository extends JpaRepository<Trip, UUID> {
    @Query(nativeQuery = true,value = "select * from trip t order by random() limit 5")
    List<Trip> findTopFiveOffers();
}
