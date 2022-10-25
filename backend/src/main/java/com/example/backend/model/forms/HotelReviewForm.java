package com.example.backend.model.forms;

import lombok.Data;

@Data
public class HotelReviewForm {
    Integer stars;
    String description;
    String username;
    String hotelId;
}
