package com.example.backend.model.dto;

import com.example.backend.model.HotelReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class TripInHotelDetailsDto {

    HotelReviewDto hotelReviewDto;

    List<String> allImagesForHotel;

    List<RoomDto> roomsInHotel;
}
