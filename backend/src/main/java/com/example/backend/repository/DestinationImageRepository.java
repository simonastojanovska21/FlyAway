package com.example.backend.repository;

import com.example.backend.model.DestinationImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DestinationImageRepository extends JpaRepository<DestinationImage, UUID> {
}
