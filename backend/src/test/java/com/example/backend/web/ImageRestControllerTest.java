package com.example.backend.web;

import com.example.backend.service.ImageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class ImageRestControllerTest {

    @InjectMocks
    ImageRestController imageRestController;

    @Mock
    ImageService imageService;

    @Test
    void getImagesForHotel() {
    }

    @Test
    void addImageForHotel() {
    }

    @Test
    void deleteImageForHotel() {
    }

    @Test
    void getImagesForRoom() {
    }

    @Test
    void addImageForRoom() {
    }

    @Test
    void deleteImageForRoom() {
    }
}