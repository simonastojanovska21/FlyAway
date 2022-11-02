package com.example.backend.repository;

import com.example.backend.model.Booking;
import com.example.backend.model.enumerations.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findAllByUserMakesBooking_Username(String username);
    List<Booking> findAllByBookingForTrip_Id(UUID tripId);

    @Query("select b from Booking b where b.userMakesBooking.username=?1 and b.bookingForTrip.startDate>=?2 " +
            "order by b.bookingForTrip.startDate")
    List<Booking> findAllUpcomingTripsForUser(String username, LocalDate date);
}
