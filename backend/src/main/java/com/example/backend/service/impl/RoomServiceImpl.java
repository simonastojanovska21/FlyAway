package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.Room;
import com.example.backend.model.dto.RoomDto;
import com.example.backend.model.enumerations.RoomType;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.repository.RoomRepository;
import com.example.backend.service.HotelService;
import com.example.backend.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelService hotelService;

    @Override
    public Optional<Room> addNewRoomForHotel(RoomDto roomDto) {
        Hotel hotel = this.hotelService.getHotel(roomDto.getHotelId())
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + roomDto.getHotelId()
                        +" is not found"));
        Room room = new Room(roomDto.getRoomNumber(),roomDto.getPricePerNight(),roomDto.getNumberOfGuests(),
                RoomType.valueOf(roomDto.getRoomType()),hotel);
        return Optional.of(this.roomRepository.save(room));
    }
}
