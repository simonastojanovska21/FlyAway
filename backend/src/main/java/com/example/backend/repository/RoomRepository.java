package com.example.backend.repository;

import com.example.backend.model.Room;
import com.example.backend.model.enumerations.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    long countByRoomTypeAndRoomInHotel_Id(RoomType roomType,UUID hotelId);
    List<Room> findAllByRoomInHotelId(UUID hotelId);
}
