package com.example.backend.web;

import com.example.backend.model.Booking;
import com.example.backend.model.dto.BookingDto;
import com.example.backend.model.forms.BookingForm;
import com.example.backend.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bookings")
@AllArgsConstructor
public class BookingRestController {

    private final BookingService bookingService;

    @GetMapping("/upcomingBookings/{username}")
    public List<BookingDto> getActiveBookingsForUser(@PathVariable String username){
        return this.bookingService.getUpcomingBookingsForUser(username);
    }

    @GetMapping("/details/{bookingId}")
    public ResponseEntity<BookingDto> getBookingDetails(@PathVariable String bookingId){
        return this.bookingService.getBookingDetails(bookingId)
                .map(booking -> ResponseEntity.ok().body(booking))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @GetMapping("/allBookings/{username}")
    public List<BookingDto> getAllBookingsForUser(@PathVariable String username){
        return this.bookingService.getAllBookingsForUser(username);
    }

    @GetMapping("/forTrip/{tripId}")
    public List<BookingDto> getAllBookingsForTrip(@PathVariable String tripId){
        return this.bookingService.getAllBookingsForTrip(tripId);
    }

    @GetMapping("/cancelBooking/{bookingId}")
    public ResponseEntity<Booking> cancelBooking(@PathVariable String bookingId){
        return this.bookingService.cancelBookingForTrip(bookingId)
                .map(booking -> ResponseEntity.ok().body(booking))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @GetMapping("/payForTrip/{bookingId}")
    public ResponseEntity<Booking> payForBookingForTrip(@PathVariable String bookingId){
        return this.bookingService.payForBookingForTrip(bookingId)
                .map(booking -> ResponseEntity.ok().body(booking))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PostMapping("/addNewBooking")
    public ResponseEntity<?> addNewBooking(@RequestBody BookingForm bookingForm){
        return this.bookingService.addNewBooking(bookingForm)
                .map(booking -> ResponseEntity.ok().body(booking))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
