package com.example.backend.model;

import com.example.backend.model.enumerations.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue
    private UUID id;

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    private LocalDateTime bookingTime;

    @ManyToOne
    private User userMakesBooking;

    @ManyToOne
    private Trip bookingForTrip;

    @OneToOne
    private Room bookingForRoom;

    private double totalPrice;

    public Booking(User userMakesBooking, Trip bookingForTrip, Room bookingForRoom, double totalPrice) {
        this.bookingStatus = BookingStatus.RESERVED;
        this.bookingTime = LocalDateTime.now();
        this.userMakesBooking = userMakesBooking;
        this.bookingForTrip = bookingForTrip;
        this.bookingForRoom = bookingForRoom;
        this.totalPrice = totalPrice;
    }
}
