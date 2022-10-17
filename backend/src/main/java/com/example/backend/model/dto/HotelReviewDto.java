package com.example.backend.model.dto;

import lombok.Data;

@Data
public class HotelReviewDto {
    Integer stars;
    String descriptions;
    String username;
    String hotelId;
}
