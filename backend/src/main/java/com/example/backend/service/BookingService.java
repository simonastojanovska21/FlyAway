package com.example.backend.service;

import com.example.backend.model.Booking;
import com.example.backend.model.dto.BookingDto;
import com.example.backend.model.forms.BookingForm;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    Optional<Booking> addNewBooking(BookingForm bookingForm);
    List<BookingDto> getUpcomingBookingsForUser(String username);
    List<BookingDto> getAllBookingsForUser(String username);
    Optional<Booking> cancelBookingForTrip(String bookingId);
    List<BookingDto> getAllBookingsForTrip(String tripId);
    Optional<Booking> payForBookingForTrip(String bookingId);
    Optional<BookingDto> getBookingDetails(String bookingId);
}
