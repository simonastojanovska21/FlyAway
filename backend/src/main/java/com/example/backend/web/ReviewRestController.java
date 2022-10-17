package com.example.backend.web;

import com.example.backend.model.Review;
import com.example.backend.model.dto.HotelReviewDto;
import com.example.backend.model.dto.ReviewDto;
import com.example.backend.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/review")
@AllArgsConstructor
public class ReviewRestController {
    private final ReviewService reviewService;

    @GetMapping("/reviewList")
    public List<Review> getThreeReviews(){
        return this.reviewService.getThreeReviews();
    }

    @PostMapping("/addReview")
    public ResponseEntity<?> addNewReview(@RequestBody ReviewDto reviewDto){
        return this.reviewService.addNewReview(reviewDto)
                .map(review->ResponseEntity.ok().body(review))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PostMapping("/addHotelReview")
    public ResponseEntity<?> addHotelReview(@RequestBody HotelReviewDto hotelReviewDto){
        return this.reviewService.addNewHotelReview(hotelReviewDto)
                .map(hotelReview->ResponseEntity.ok().body(hotelReview))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
