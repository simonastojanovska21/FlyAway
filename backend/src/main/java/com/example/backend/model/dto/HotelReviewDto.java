package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class HotelReviewDto {

    private String author;

    private String datePublished;

    private String reviewBody;

    private int reviewRating;
}
