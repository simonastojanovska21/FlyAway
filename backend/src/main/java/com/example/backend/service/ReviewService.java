package com.example.backend.service;

import com.example.backend.model.HotelReview;
import com.example.backend.model.Review;
import com.example.backend.model.dto.HotelReviewDto;
import com.example.backend.model.dto.ReviewDto;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Optional<Review> addNewReview(ReviewDto reviewDto);
    Optional<HotelReview> addNewHotelReview(HotelReviewDto hotelReviewDto);
    List<Review> getThreeReviews();
}
