package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoomTypesAndPriceDto {

    private String roomType;

    private double price;
}
