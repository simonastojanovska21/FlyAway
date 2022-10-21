package com.example.backend.repository;

import com.example.backend.model.RoomPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomPriceRepository extends JpaRepository<RoomPrice, UUID> {
}
