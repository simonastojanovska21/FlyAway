package com.example.backend.repository;

import com.example.backend.model.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HotelImageRepository extends JpaRepository<HotelImage, UUID> {
    List<HotelImage> findAllByImageForHotel_Id(UUID hotelId);
}
