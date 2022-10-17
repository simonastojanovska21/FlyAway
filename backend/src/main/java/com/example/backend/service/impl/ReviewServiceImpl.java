package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelReview;
import com.example.backend.model.Review;
import com.example.backend.model.User;
import com.example.backend.model.dto.HotelReviewDto;
import com.example.backend.model.dto.ReviewDto;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.exceptions.UserNotFoundException;
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
    public Optional<Review> addNewReview(ReviewDto reviewDto) {
        User user = this.userService.getUserInfo(reviewDto.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User with username "+ reviewDto.getUsername()
                        + " is not found"));
        Review review = new Review(reviewDto.getStars(),reviewDto.getDescriptions(),user);
        return Optional.of(this.reviewRepository.save(review));
    }

    @Override
    public Optional<HotelReview> addNewHotelReview(HotelReviewDto hotelReviewDto) {
        User user = this.userService.getUserInfo(hotelReviewDto.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User with username "+ hotelReviewDto.getUsername()
                        + " is not found"));
        Hotel hotel = this.hotelService.getHotel(hotelReviewDto.getHotelId())
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + hotelReviewDto.getHotelId()
                        +" is not found"));
        HotelReview hotelReview = new HotelReview(hotelReviewDto.getStars(), hotelReviewDto.getDescriptions(),
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
