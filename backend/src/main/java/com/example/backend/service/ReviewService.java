package com.example.backend.service;

import com.example.backend.model.HotelReview;
import com.example.backend.model.Review;
import com.example.backend.model.forms.HotelReviewForm;
import com.example.backend.model.forms.ReviewForm;

import java.util.List;
import java.util.Optional;

public interface ReviewService {
    Optional<Review> addNewReview(ReviewForm reviewForm);
    Optional<HotelReview> addNewHotelReview(HotelReviewForm hotelReviewForm);
    List<Review> getThreeReviews();
}
