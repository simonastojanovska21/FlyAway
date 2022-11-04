package com.example.backend.web;

import com.example.backend.model.HotelReview;
import com.example.backend.model.Review;
import com.example.backend.model.forms.HotelReviewForm;
import com.example.backend.model.forms.ReviewForm;
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
    public ResponseEntity<Review> addNewReview(@RequestBody ReviewForm reviewForm){
        return this.reviewService.addNewReview(reviewForm)
                .map(review->ResponseEntity.ok().body(review))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PostMapping("/addHotelReview")
    public ResponseEntity<HotelReview> addHotelReview(@RequestBody HotelReviewForm hotelReviewForm){
        return this.reviewService.addNewHotelReview(hotelReviewForm)
                .map(hotelReview->ResponseEntity.ok().body(hotelReview))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
