package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class HotelReview {

    @Id
    @GeneratedValue
    private UUID id;

    private int stars;

    private String description;

    private LocalDateTime time;

    @ManyToOne
    private Hotel reviewForHotel;

    @ManyToOne
    private User userGivesReview;

    public HotelReview(int stars, String description, Hotel reviewForHotel, User userGivesReview) {
        this.stars = stars;
        this.description = description;
        this.time = LocalDateTime.now();
        this.reviewForHotel = reviewForHotel;
        this.userGivesReview = userGivesReview;
    }
}
