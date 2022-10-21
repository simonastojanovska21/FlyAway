package com.example.backend.repository;

import com.example.backend.model.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoomImageRepository extends JpaRepository<RoomImage, UUID> {
    List<RoomImage> findAllByImageForRoom_Id(UUID roomId);
}
