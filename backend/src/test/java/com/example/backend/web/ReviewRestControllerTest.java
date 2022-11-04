package com.example.backend.web;

import com.example.backend.model.*;
import com.example.backend.model.enumerations.Role;
import com.example.backend.model.forms.HotelReviewForm;
import com.example.backend.model.forms.ReviewForm;
import com.example.backend.service.ReviewService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class ReviewRestControllerTest {

    @InjectMocks
    ReviewRestController reviewRestController;

    @Mock
    ReviewService reviewService;

    private final User user = new User("test@test.com","P@ssword1","Test name","Test surname", Role.ROLE_USER);


    @Test
    void getThreeReviews() {
        List<Review> reviewList = new ArrayList<>(){{
            add(new Review(UUID.randomUUID(),5,"Description", LocalDateTime.now(),user));
            add(new Review(UUID.randomUUID(),5,"Description", LocalDateTime.now(),user));
            add(new Review(UUID.randomUUID(),5,"Description", LocalDateTime.now(),user));
        }};
        Mockito.when(reviewService.getThreeReviews()).thenReturn(reviewList);

        List<Review> response = reviewRestController.getThreeReviews();
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void addNewReview() {
        Review review = new Review(UUID.randomUUID(),5,"Description", LocalDateTime.now(),user);
        ReviewForm reviewForm = new ReviewForm(5,"Description","test@test.com");
        Mockito.when(reviewService.addNewReview(Mockito.any(ReviewForm.class))).thenReturn(Optional.of(review));

        ResponseEntity<Review> responseEntity = reviewRestController.addNewReview(reviewForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getUserGivesReview());
    }

    @Test
    void addHotelReview() {
        Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
                new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
        HotelReview hotelReview = new HotelReview(UUID.randomUUID(),3,"Hotel review description",LocalDateTime.now(),hotel,user);
        HotelReviewForm hotelReviewForm = new HotelReviewForm(3,"Hotel review description","test@test.com","b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        Mockito.when(reviewService.addNewHotelReview(Mockito.any(HotelReviewForm.class))).thenReturn(Optional.of(hotelReview));

        ResponseEntity<HotelReview> responseEntity = reviewRestController.addHotelReview(hotelReviewForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getReviewForHotel());
        assertNotNull(responseEntity.getBody().getUserGivesReview());
    }
}