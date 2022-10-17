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
public class Review {

    @Id
    @GeneratedValue
    private UUID id;

    private int stars;

    private String description;

    private LocalDateTime time;

    @ManyToOne
    private User userGivesReview;

    public Review(int stars, String description,User userGivesReview) {
        this.stars = stars;
        this.description = description;
        this.time = LocalDateTime.now();
        this.userGivesReview = userGivesReview;
    }
}

