package com.example.backend.web;

import com.example.backend.model.dto.BookingDto;
import com.example.backend.service.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class BookingRestControllerTest {

    @InjectMocks
    BookingRestController bookingRestController;

    @Mock
    BookingService bookingService;

    @Test
    void getActiveBookingsForUser() {
//        List<BookingDto> upcomingBookings=new ArrayList<>();
//        upcomingBookings.add(new BookingDto());
//        upcomingBookings.add(new BookingDto());
//        upcomingBookings.add(new BookingDto());
//        Mockito.when(bookingService.getUpcomingBookingsForUser(Mockito.any(String.class))).thenReturn(upcomingBookings);
//
//        List<BookingDto> response = bookingRestController.getActiveBookingsForUser("test@test.com");
//        assertThat(response.getStatusCodeValue()).isEqualTo(200);

    }

    @Test
    void getBookingDetails() {
    }

    @Test
    void getAllBookingsForUser() {
    }

    @Test
    void getAllBookingsForTrip() {
    }

    @Test
    void cancelBooking() {
    }

    @Test
    void payForBookingForTrip() {
    }

    @Test
    void addNewBooking() {
    }
}