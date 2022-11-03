package com.example.backend.web;

import com.example.backend.service.RoomService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class RoomRestControllerTest {

    @InjectMocks
    RoomRestController roomRestController;

    @Mock
    RoomService roomService;

    @Test
    void getRoomData() {
    }

    @Test
    void getRoomsInHotel() {
    }

    @Test
    void getDetailsAboutRoom() {
    }

    @Test
    void getRoomTypesAndPriceInHotel() {
    }

    @Test
    void addNewRoom() {
    }

    @Test
    void editRoom() {
    }

    @Test
    void deleteHotel() {
    }
}