package com.example.backend.repository;

import com.example.backend.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, UUID> {
    @Query(nativeQuery = true,value = "select * from destination d order by random() limit 3")
    List<Destination> findThreeTopDestinations();
}
