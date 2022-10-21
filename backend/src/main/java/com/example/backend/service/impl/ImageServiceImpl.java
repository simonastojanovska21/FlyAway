package com.example.backend.service.impl;

import com.example.backend.model.Hotel;
import com.example.backend.model.HotelImage;
import com.example.backend.model.Room;
import com.example.backend.model.RoomImage;
import com.example.backend.model.enumerations.ImageTag;
import com.example.backend.model.exceptions.HotelNotFoundException;
import com.example.backend.model.exceptions.RoomNotFoundException;
import com.example.backend.model.forms.ImageForm;
import com.example.backend.repository.HotelImageRepository;
import com.example.backend.repository.HotelRepository;
import com.example.backend.repository.RoomImageRepository;
import com.example.backend.repository.RoomRepository;
import com.example.backend.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final HotelImageRepository hotelImageRepository;
    private final HotelRepository hotelRepository;
    private final RoomImageRepository roomImageRepository;
    private final RoomRepository roomRepository;

    @Override
    public List<HotelImage> getImagesForHotel(String hotelId) {
        return this.hotelImageRepository.findAllByImageForHotel_Id(UUID.fromString(hotelId));
    }

    @Override
    public Optional<HotelImage> addImageForHotel(String hotelId, ImageForm imageForm) {
        Hotel hotel = this.hotelRepository.findById(UUID.fromString(hotelId))
                .orElseThrow(()->new HotelNotFoundException("Hotel with id " + hotelId +" is not found"));
        return Optional.of(this.hotelImageRepository.save(new HotelImage(imageForm.getImageUrl(),
                ImageTag.valueOf(imageForm.getImageTag()),hotel)));
    }

    @Override
    public boolean deleteImageForHotel(String hotelImageId) {
        this.hotelImageRepository.deleteById(UUID.fromString(hotelImageId));
        return this.hotelImageRepository.findById(UUID.fromString(hotelImageId)).isEmpty();
    }

    @Override
    public List<RoomImage> getImagesForRoom(String roomId) {
        return this.roomImageRepository.findAllByImageForRoom_Id(UUID.fromString(roomId));
    }

    @Override
    public Optional<RoomImage> addImageForRoom(String roomId,String url) {
        Room room = this.roomRepository.findById(UUID.fromString(roomId))
                .orElseThrow(()->new RoomNotFoundException("Room with id " + roomId+" is not found"));
        return Optional.of(this.roomImageRepository.save(new RoomImage(url,room)));
    }

    @Override
    public boolean deleteImageForRoom(String roomImageId) {
        this.roomImageRepository.deleteById(UUID.fromString(roomImageId));
        return this.roomImageRepository.findById(UUID.fromString(roomImageId)).isEmpty();
    }
}
