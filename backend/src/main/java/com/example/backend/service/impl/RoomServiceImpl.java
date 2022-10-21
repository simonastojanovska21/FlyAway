package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.Room;
import com.example.backend.model.RoomImage;
import com.example.backend.model.dto.EditRoomDto;
import com.example.backend.model.dto.RoomTypesAndPriceDto;
import com.example.backend.model.exceptions.RoomNotFoundException;
import com.example.backend.model.forms.RoomForm;
import com.example.backend.model.enumerations.RoomType;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.repository.HotelRepository;
import com.example.backend.repository.RoomImageRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.service.RoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final RoomImageRepository roomImageRepository;

    @Override
    public Optional<Room> addNewRoomForHotel(RoomForm roomForm) {
        Hotel hotel = this.hotelRepository.findById(UUID.fromString(roomForm.getHotelId()))
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + roomForm.getHotelId()
                        +" is not found"));
        Room room = this.roomRepository.save(new Room(roomForm.getRoomNumber(), roomForm.getPricePerNight(), roomForm.getNumberOfGuests(),
                RoomType.valueOf(roomForm.getRoomType()),hotel));
        roomForm.getImagesUrl().forEach(image->this.addRoomImage(image,room));
        return Optional.of(room);
    }

    @Override
    public void addRoomImage(String url, Room room) {
        this.roomImageRepository.save(new RoomImage(url,room));
    }

    @Override
    public Map<String, Integer> countRoomsByRoomType(UUID hotelId) {
        Map<String, Integer> map = new HashMap<>();
        Arrays.stream(RoomType.values())
                .forEach(roomType -> map.put(roomType.toString(),
                        (int) roomRepository.countByRoomTypeAndRoomInHotel_Id(roomType,hotelId)));
        return map;
    }

    @Override
    public List<Room> getRoomsInHotel(String hotelId) {
        return this.roomRepository.findAllByRoomInHotelId(UUID.fromString(hotelId));
    }

    @Override
    public Optional<Room> getRoomDetails(String roomId) {
        return this.roomRepository.findById(UUID.fromString(roomId));
    }

    @Override
    public Optional<Room> updateRoom(String roomId, EditRoomDto editRoomDto) {
        Room room = this.roomRepository.findById(UUID.fromString(roomId))
                .orElseThrow(()->new RoomNotFoundException("Room with id " + roomId+" is not found"));
        room.setNumberOfGuests(editRoomDto.getNumberOfGuests());
        room.setRoomType(RoomType.valueOf(editRoomDto.getRoomType()));
        room.setPricePerNight(editRoomDto.getPricePerNight());
        return Optional.of(this.roomRepository.save(room));
    }

    @Override
    public boolean deleteRoom(String roomId) {
        this.roomRepository.deleteById(UUID.fromString(roomId));
        return this.roomRepository.findById(UUID.fromString(roomId)).isEmpty();
    }

    @Override
    public List<RoomTypesAndPriceDto> getRoomTypesAndPriceInHotel(String hotelId) {
        return this.getRoomsInHotel(hotelId).stream()
                .map(room -> new RoomTypesAndPriceDto(room.getRoomType().toString(),room.getPricePerNight()))
                .collect(Collectors.toList());
    }
}
