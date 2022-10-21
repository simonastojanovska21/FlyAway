package com.example.backend.service;

import com.example.backend.model.HotelImage;
import com.example.backend.model.RoomImage;
import com.example.backend.model.forms.ImageForm;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    List<HotelImage> getImagesForHotel(String hotelId);
    Optional<HotelImage> addImageForHotel(String hotelId, ImageForm imageForm);
    boolean deleteImageForHotel(String hotelImageId);

    List<RoomImage> getImagesForRoom(String roomId);
    Optional<RoomImage> addImageForRoom(String roomId,String url);
    boolean deleteImageForRoom(String roomImageId);
}
