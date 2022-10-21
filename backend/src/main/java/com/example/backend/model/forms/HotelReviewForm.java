package com.example.backend.model.forms;

import lombok.Data;

@Data
public class HotelReviewForm {
    Integer stars;
    String descriptions;
    String username;
    String hotelId;
}
