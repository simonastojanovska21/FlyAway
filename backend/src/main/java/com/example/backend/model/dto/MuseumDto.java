package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MuseumDto {

    private String name;

    private double longitude;

    private double latitude;

    private String imageUrl;

    private String description;

}
