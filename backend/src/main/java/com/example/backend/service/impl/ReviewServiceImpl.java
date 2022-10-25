package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelReview;
import com.example.backend.model.Review;
import com.example.backend.model.User;
import com.example.backend.model.forms.HotelReviewForm;
import com.example.backend.model.forms.ReviewForm;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.repository.HotelReviewRepository;
import com.example.backend.repository.ReviewRepository;
import com.example.backend.service.HotelService;
import com.example.backend.service.ReviewService;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final HotelReviewRepository hotelReviewRepository;
    private final UserService userService;
    private final HotelService hotelService;
    @Override
    public Optional<Review> addNewReview(ReviewForm reviewForm) {
        User user = this.userService.getUserInfo(reviewForm.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User with username "+ reviewForm.getUsername()
                        + " is not found"));
        Review review = new Review(reviewForm.getStars(), reviewForm.getDescriptions(),user);
        return Optional.of(this.reviewRepository.save(review));
    }

    @Override
    public Optional<HotelReview> addNewHotelReview(HotelReviewForm hotelReviewForm) {
        User user = this.userService.getUserInfo(hotelReviewForm.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User with username "+ hotelReviewForm.getUsername()
                        + " is not found"));
        Hotel hotel = this.hotelService.getHotelDetails(hotelReviewForm.getHotelId())
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + hotelReviewForm.getHotelId()
                        +" is not found"));
        HotelReview hotelReview = new HotelReview(hotelReviewForm.getStars(), hotelReviewForm.getDescription(),
                hotel,user);
        return Optional.of(this.hotelReviewRepository.save(hotelReview));
    }

    @Override
    public List<Review> getThreeReviews() {
        List<Review> reviews = this.reviewRepository.findAll();
        if(reviews.size() <= 3)
            return reviews;
        Collections.shuffle(reviews);
        return reviews.subList(0,3);
    }
}
