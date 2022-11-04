package com.example.backend.web;

import com.example.backend.model.*;
import com.example.backend.model.enumerations.RoomType;
import com.example.backend.model.forms.ImageForm;
import com.example.backend.service.ImageService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class ImageRestControllerTest {

    @InjectMocks
    ImageRestController imageRestController;

    @Mock
    ImageService imageService;

    private final ImageForm imageForm = new ImageForm("https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg");
    private final Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
            "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
            "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
            new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
    private final Room room = new Room(UUID.randomUUID(),15,150.0,3, RoomType.Triple,hotel);

    @Test
    void getImagesForHotel() {
        List<HotelImage> hotelImageList = new ArrayList<>(){{
            add(new HotelImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",hotel));
            add(new HotelImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",hotel));
        }};
        Mockito.when(imageService.getImagesForHotel(Mockito.anyString())).thenReturn(hotelImageList);

        List<HotelImage> response = imageRestController.getImagesForHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(response);
        assertEquals(response.size(),2);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void addImageForHotel() {
        HotelImage hotelImage = new HotelImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",hotel);
        Mockito.when(imageService.addImageForHotel(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.of(hotelImage));

        ResponseEntity<HotelImage> responseEntity = imageRestController.addImageForHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784",imageForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
    }

    @Test
    void deleteImageForHotel() {
        Mockito.when(imageService.deleteImageForHotel(Mockito.anyString())).thenReturn(true);

        ResponseEntity responseEntity = imageRestController.deleteImageForHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(responseEntity);
    }

    @Test
    void getImagesForRoom() {
        List<RoomImage> roomImageList = new ArrayList<>(){{
            add(new RoomImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",room));
            add(new RoomImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",room));
            add(new RoomImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",room));
        }};
        Mockito.when(imageService.getImagesForRoom(Mockito.anyString())).thenReturn(roomImageList);
        List<RoomImage> response = imageRestController.getImagesForRoom("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void addImageForRoom() {
        RoomImage roomImage = new RoomImage(UUID.randomUUID(),"https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg",room);
        Mockito.when(imageService.addImageForRoom(Mockito.anyString(),Mockito.anyString())).thenReturn(Optional.of(roomImage));

        ResponseEntity<RoomImage> responseEntity = imageRestController.addImageForRoom("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784",imageForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
    }

    @Test
    void deleteImageForRoom() {
        Mockito.when(imageService.deleteImageForRoom(Mockito.anyString())).thenReturn(true);
        ResponseEntity responseEntity = imageRestController.deleteImageForRoom("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(responseEntity);
    }
}