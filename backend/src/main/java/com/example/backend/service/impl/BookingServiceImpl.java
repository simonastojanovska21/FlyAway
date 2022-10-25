package com.example.backend.service.impl;

import com.example.backend.model.Booking;
import com.example.backend.model.Room;
import com.example.backend.model.Trip;
import com.example.backend.model.User;
import com.example.backend.model.dto.BookingDto;
import com.example.backend.model.enumerations.BookingStatus;
import com.example.backend.model.exceptions.RoomNotFoundException;
import com.example.backend.model.exceptions.TripDoesNotExistException;
import com.example.backend.model.forms.BookingForm;
import com.example.backend.repository.BookingRepository;
import com.example.backend.service.BookingService;
import com.example.backend.service.RoomService;
import com.example.backend.service.TripService;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final UserService userService;
    private final TripService tripService;
    private final RoomService roomService;

    @Override
    public Optional<Booking> addNewBooking(BookingForm bookingForm) {
        User user = this.userService.getUserInfo(bookingForm.getUsername())
                .orElseThrow(()->new UsernameNotFoundException("User with username "+ bookingForm.getUsername()
                        + " is not found"));
        Trip trip=this.tripService.getTrip(bookingForm.getTripId())
                .orElseThrow(()->new TripDoesNotExistException("Trip with id "+bookingForm.getTripId()
                        + " is not found"));
        Room room=this.roomService.getRoomDetails(bookingForm.getRoomId())
                .orElseThrow(()-> new RoomNotFoundException("Room with id "+bookingForm.getRoomId()
                        + " is not found"));
        return Optional.of(this.bookingRepository.save(new Booking(user,trip,room, bookingForm.getTotalPrice())));
    }

    @Override
    public List<BookingDto> getUpcomingBookingsForUser(String username) {
        return this.bookingRepository.findAllUpcomingTripsForUser(username, LocalDate.now())
                .stream()
                .map(booking -> new BookingDto(username,booking.getId().toString(),booking.getBookingStatus().toString(),
                        booking.getBookingForTrip().getTripInHotel().getName(),
                        booking.getBookingForTrip().getTripInHotel().getHotelLocation().getCity(),booking.getTotalPrice(),
                        booking.getBookingForTrip().getStartDate(),booking.getBookingForTrip().getEndDate(),
                        booking.getBookingForRoom().getRoomType().toString(),booking.getBookingForRoom().getNumberOfGuests()))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDto> getAllBookingsForUser(String username) {
        return this.bookingRepository.findAllByUserMakesBooking_Username(username)
                .stream()
                .map(booking -> new BookingDto(username,booking.getId().toString(),booking.getBookingStatus().toString(),
                        booking.getBookingForTrip().getTripInHotel().getName(),
                        booking.getBookingForTrip().getTripInHotel().getHotelLocation().getCity(),booking.getTotalPrice(),
                        booking.getBookingForTrip().getStartDate(),booking.getBookingForTrip().getEndDate(),
                        booking.getBookingForRoom().getRoomType().toString(),booking.getBookingForRoom().getNumberOfGuests()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Booking> cancelBookingForTrip(String bookingId) {
        Booking booking = this.bookingRepository.getById(UUID.fromString(bookingId));
        booking.setBookingStatus(BookingStatus.CANCELED);
        return Optional.of(this.bookingRepository.save(booking));
    }

    @Override
    public List<BookingDto> getAllBookingsForTrip(String tripId) {
        return this.bookingRepository.findAllByBookingForTrip_Id(UUID.fromString(tripId))
                .stream()
                .map(booking -> new BookingDto(booking.getUserMakesBooking().getUsername(),booking.getId().toString(),
                        booking.getBookingStatus().toString(),
                        booking.getBookingForTrip().getTripInHotel().getName(),
                        booking.getBookingForTrip().getTripInHotel().getHotelLocation().getCity(),booking.getTotalPrice(),
                        booking.getBookingForTrip().getStartDate(),booking.getBookingForTrip().getEndDate(),
                        booking.getBookingForRoom().getRoomType().toString(),booking.getBookingForRoom().getNumberOfGuests()))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Booking> payForBookingForTrip(String bookingId) {
        Booking booking = this.bookingRepository.getById(UUID.fromString(bookingId));
        booking.setBookingStatus(BookingStatus.PAID);
        return Optional.of(this.bookingRepository.save(booking));
    }

    @Override
    public Optional<BookingDto> getBookingDetails(String bookingId) {
        Booking booking=this.bookingRepository.getById(UUID.fromString(bookingId));
        return Optional.of(new BookingDto(booking.getUserMakesBooking().getName()+" " +booking.getUserMakesBooking().getSurname(),
                bookingId,booking.getBookingStatus().toString(), booking.getBookingForTrip().getTripInHotel().getName(),
                booking.getBookingForTrip().getTripInHotel().getHotelLocation().getCity(),booking.getTotalPrice(),
                booking.getBookingForTrip().getStartDate(),booking.getBookingForTrip().getEndDate(),
                booking.getBookingForRoom().getRoomType().toString(),booking.getBookingForRoom().getNumberOfGuests()));
    }
}
