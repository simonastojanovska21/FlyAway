package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HotelReviewForm {
    Integer stars;
    String description;
    String username;
    String hotelId;
}
