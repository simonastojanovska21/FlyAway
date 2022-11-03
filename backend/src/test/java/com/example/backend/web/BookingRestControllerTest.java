package com.example.backend.web;

import com.example.backend.model.Booking;
import com.example.backend.model.Room;
import com.example.backend.model.Trip;
import com.example.backend.model.User;
import com.example.backend.model.dto.BookingDto;
import com.example.backend.model.enumerations.BookingStatus;
import com.example.backend.model.forms.BookingForm;
import com.example.backend.service.BookingService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class BookingRestControllerTest {
    @InjectMocks
    BookingRestController bookingRestController;

    @Mock
    BookingService bookingService;

    @Test
    void getActiveBookingsForUser() throws Exception {
        List<BookingDto> upcomingBookings=new ArrayList<>();
        upcomingBookings.add(new BookingDto("customer2@test.com","5601768c-6657-46de-8282-875e40c70ef8",
                "71fa5088-40f5-4ccb-bfcc-ccf49f633bd8","CANCELED","Victor's Residenz",
                "Berlin",1440, LocalDate.now(),LocalDate.now(),"Studio",3));
        upcomingBookings.add(new BookingDto("customer2@test.com","5601768c-6657-46de-8282-875e40c70ef8",
                "71fa5088-40f5-4ccb-bfcc-ccf49f633bd8","PAID","Ivy Boutique Hotel",
                "Chicago",1440, LocalDate.now(),LocalDate.now(),"Double",2));


        Mockito.when(bookingService.getUpcomingBookingsForUser(Mockito.any(String.class))).thenReturn(upcomingBookings);

        List<BookingDto> response = bookingRestController.getActiveBookingsForUser("test@test.com");
        assertEquals(response.size(),2);

    }

    @Test
    void getBookingDetails() {
        BookingDto bookingDto = new BookingDto("test@test.com","2c9847c6-7f74-4976-8a2f-d38c5b58c27c",
                "a8daea0c-f2b6-42cc-b3b0-ec1b3ee375a8","PAID","Ivy Boutique Hotel",
                "Chicago",1440, LocalDate.now(),LocalDate.now(),"Double",2);
        Mockito.when(bookingService.getBookingDetails(Mockito.any(String.class))).thenReturn(Optional.of(bookingDto));

        ResponseEntity<BookingDto> responseEntity = bookingRestController.getBookingDetails("2c9847c6-7f74-4976-8a2f-d38c5b58c27c");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertEquals(responseEntity.getBody().getUsername(),"test@test.com");
        assertEquals(responseEntity.getBody().getBookingId(),"2c9847c6-7f74-4976-8a2f-d38c5b58c27c");
        assertEquals(responseEntity.getBody().getDestinationId(),"a8daea0c-f2b6-42cc-b3b0-ec1b3ee375a8");
    }

    @Test
    void getAllBookingsForUser() {
        List<BookingDto> upcomingBookings=new ArrayList<>();
        upcomingBookings.add(new BookingDto("customer2@test.com","5601768c-6657-46de-8282-875e40c70ef8",
                "71fa5088-40f5-4ccb-bfcc-ccf49f633bd8","CANCELED","Victor's Residenz",
                "Berlin",1440, LocalDate.now(),LocalDate.now(),"Studio",3));
        upcomingBookings.add(new BookingDto("customer2@test.com","5601768c-6657-46de-8282-875e40c70ef8",
                "71fa5088-40f5-4ccb-bfcc-ccf49f633bd8","PAID","Ivy Boutique Hotel",
                "Chicago",1440, LocalDate.now(),LocalDate.now(),"Double",2));

        Mockito.when(bookingService.getAllBookingsForUser(Mockito.any(String.class))).thenReturn(upcomingBookings);
        List<BookingDto> response = bookingRestController.getAllBookingsForUser("test@test.com");
        assertEquals(response.size(),2);
    }

    @Test
    void getAllBookingsForTrip() {
        List<BookingDto> allBookingsForTrip = new ArrayList<>();
        allBookingsForTrip.add(new BookingDto("customer2@test.com", "2c9847c6-7f74-4976-8a2f-d38c5b58c27c",
                "a8daea0c-f2b6-42cc-b3b0-ec1b3ee375a8", "PAID", "Ivy Boutique Hotel",
                 "Chicago", 1440, LocalDate.now(),LocalDate.now(),"Double", 2));
        allBookingsForTrip.add(new BookingDto("admin@admin.com", "e0123b96-9d37-4242-b058-4670a410bce2",
                "a8daea0c-f2b6-42cc-b3b0-ec1b3ee375a8", "PAID", "Ivy Boutique Hotel",
                 "Chicago", 1840, LocalDate.now(),LocalDate.now(), "Triple", 3));

        Mockito.when(bookingService.getAllBookingsForTrip(Mockito.any(String.class))).thenReturn(allBookingsForTrip);
        List<BookingDto> response = bookingRestController.getAllBookingsForTrip("30e2c9bd-61ac-485a-9bbf-f25e9c1776c8");
        assertEquals(response.size(),2);
    }

    @Test
    void cancelBooking() {
        Booking booking = new Booking(UUID.fromString("2c9847c6-7f74-4976-8a2f-d38c5b58c27c"), BookingStatus.CANCELED,
                LocalDateTime.now(), new User(),new Trip(),new Room(),150);

        Mockito.when(bookingService.cancelBookingForTrip(Mockito.any(String.class))).thenReturn(Optional.of(booking));
        ResponseEntity<Booking> responseEntity = bookingRestController.cancelBooking("2c9847c6-7f74-4976-8a2f-d38c5b58c27c");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertEquals(responseEntity.getBody().getBookingStatus(),BookingStatus.CANCELED);
    }

    @Test
    void payForBookingForTrip() {
        Booking booking = new Booking(UUID.fromString("2c9847c6-7f74-4976-8a2f-d38c5b58c27c"), BookingStatus.PAID,
                LocalDateTime.now(), new User(),new Trip(),new Room(),150);
        Mockito.when(bookingService.payForBookingForTrip(Mockito.any(String.class))).thenReturn(Optional.of(booking));

        ResponseEntity<Booking> responseEntity = bookingRestController.payForBookingForTrip("2c9847c6-7f74-4976-8a2f-d38c5b58c27c");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertEquals(responseEntity.getBody().getBookingStatus(),BookingStatus.PAID);
    }

    @Test
    void addNewBooking() {
        BookingForm bookingForm = new BookingForm("test@test.com","2c9847c6-7f74-4976-8a2f-d38c5b58c27c",
                "a8daea0c-f2b6-42cc-b3b0-ec1b3ee375a8",650);
        Booking booking = new Booking(UUID.fromString("2c9847c6-7f74-4976-8a2f-d38c5b58c27c"), BookingStatus.PAID,
                LocalDateTime.now(), new User(),new Trip(),new Room(),650);
        Mockito.when(bookingService.addNewBooking(Mockito.any(BookingForm.class))).thenReturn(Optional.of(booking));

        ResponseEntity<?> responseEntity = bookingRestController.addNewBooking(bookingForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
    }
}