package com.example.backend.service;

import com.example.backend.model.Room;
import com.example.backend.model.dto.EditRoomDto;
import com.example.backend.model.dto.RoomTypesAndPriceDto;
import com.example.backend.model.forms.RoomForm;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

public interface RoomService {
    Optional<Room> addNewRoomForHotel(RoomForm roomForm);
    void addRoomImage(String url, Room room);
    Map<String,Integer> countRoomsByRoomType(UUID hotelId);
    List<Room> getRoomsInHotel(String hotelId);
    Optional<Room> getRoomDetails(String roomId);
    Optional<Room> updateRoom(String roomId, EditRoomDto editRoomDto);
    boolean deleteRoom(String roomId);
    List<RoomTypesAndPriceDto> getRoomTypesAndPriceInHotel(String hotelId);
}
