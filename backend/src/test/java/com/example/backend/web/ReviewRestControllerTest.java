package com.example.backend.web;

import com.example.backend.service.ReviewService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class ReviewRestControllerTest {

    @InjectMocks
    ReviewRestController reviewRestController;

    @Mock
    ReviewService reviewService;

    @Test
    void getThreeReviews() {
    }

    @Test
    void addNewReview() {
    }

    @Test
    void addHotelReview() {
    }
}