package com.example.backend.repository;

import com.example.backend.model.HotelReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HotelReviewRepository extends JpaRepository<HotelReview, UUID> {

    @Query("select avg(r.stars) from HotelReview r where r.reviewForHotel.id=?1")
    Double getAverageRatingOfHotel(UUID hotelId);

    @Query(nativeQuery = true,value = "select * from hotel_review r where r.review_for_hotel_id= ?1 order by random() limit 1")
    HotelReview getRandomReview(UUID hotelId);
}
