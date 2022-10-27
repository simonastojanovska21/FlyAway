package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DestinationDto {
    private String destinationAbstract;

    private String homepage;

    private String currency;

    private String countryCode;
}
