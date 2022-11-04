package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewForm {
    Integer stars;
    String descriptions;
    String username;
}
