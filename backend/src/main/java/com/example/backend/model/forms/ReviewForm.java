package com.example.backend.model.forms;

import lombok.Data;

@Data
public class ReviewForm {
    Integer stars;
    String descriptions;
    String username;
}
