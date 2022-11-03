package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DestinationForm {

    private String destinationImage;

    private String destinationThumbnail;

    private String city;

    private String country;
}
