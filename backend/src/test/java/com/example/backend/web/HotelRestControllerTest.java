package com.example.backend.web;

import com.example.backend.service.HotelService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class HotelRestControllerTest {

    @InjectMocks
    HotelRestController hotelRestController;

    @Mock
    HotelService hotelService;

    @Test
    void getHotelAmenities() {
    }

    @Test
    void getAdminHotelList() {
    }

    @Test
    void getDetailsAboutHotel() {
    }

    @Test
    void getHotelsNameAndId() {
    }

    @Test
    void getTripInHotelDetails() {
    }

    @Test
    void addNewHotel() {
    }

    @Test
    void editHotel() {
    }
}