package com.example.backend.service;

import com.example.backend.model.Room;
import com.example.backend.model.dto.RoomDto;

import java.util.Optional;

public interface RoomService {
    Optional<Room> addNewRoomForHotel(RoomDto roomDto);
}
