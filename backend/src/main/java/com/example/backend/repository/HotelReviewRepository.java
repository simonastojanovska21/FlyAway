package com.example.backend.repository;

import com.example.backend.model.HotelReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HotelReviewRepository extends JpaRepository<HotelReview, UUID> {
}
