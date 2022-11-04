package com.example.backend.web;

import com.example.backend.model.Hotel;
import com.example.backend.model.Location;
import com.example.backend.model.Room;
import com.example.backend.model.dto.EditRoomDto;
import com.example.backend.model.dto.RoomTypesAndPriceDto;
import com.example.backend.model.enumerations.RoomType;
import com.example.backend.model.forms.RoomForm;
import com.example.backend.service.RoomService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class RoomRestControllerTest {

    @InjectMocks
    RoomRestController roomRestController;

    @Mock
    RoomService roomService;

    private final Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
            "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
            "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
            new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
    private final Room room = new Room(UUID.randomUUID(),15,150.0,3, RoomType.Triple,hotel);

    @Test
    void getRoomData() {
        List<String> response = roomRestController.getRoomData();
        assertNotNull(response);
        assertEquals(response.size(),5);
    }

    @Test
    void getRoomsInHotel() {
        List<Room> rooms = new ArrayList<>(){{
            add(new Room(UUID.randomUUID(),15,150.0,3, RoomType.Triple,hotel));
            add(new Room(UUID.randomUUID(),15,150.0,3, RoomType.Triple,hotel));
            add(new Room(UUID.randomUUID(),15,150.0,3, RoomType.Triple,hotel));
        }};
        Mockito.when(roomService.getRoomsInHotel(Mockito.anyString())).thenReturn(rooms);

        List<Room> response = roomRestController.getRoomsInHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getDetailsAboutRoom() {
        Mockito.when(roomService.getRoomDetails(Mockito.anyString())).thenReturn(java.util.Optional.of(room));

        ResponseEntity<Room> responseEntity = roomRestController.getDetailsAboutRoom("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getRoomInHotel());
    }

    @Test
    void getRoomTypesAndPriceInHotel() {
        List<RoomTypesAndPriceDto> roomTypesAndPriceDtoList = new ArrayList<>(){{
            add(new RoomTypesAndPriceDto(RoomType.Triple.toString(),142.0));
            add(new RoomTypesAndPriceDto(RoomType.Twin.toString(),152));
            add(new RoomTypesAndPriceDto(RoomType.Studio.toString(),264));
        }};
        Mockito.when(roomService.getRoomTypesAndPriceInHotel(Mockito.anyString())).thenReturn(roomTypesAndPriceDtoList);

        List<RoomTypesAndPriceDto> response = roomRestController.getRoomTypesAndPriceInHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void addNewRoom() {
        RoomForm roomForm = new RoomForm(15,150.0,3,"Triple",
                "b80b1bdf-0a84-4dbc-9f2c-9db3f1296784", new ArrayList<>(){{
                    add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/715cc107_z.jpg");
                    add( "https://i.travelapi.com/hotels/1000000/10000/1900/1872/e2a38516_z.jpg");}});
        Mockito.when(roomService.addNewRoomForHotel(Mockito.any(RoomForm.class))).thenReturn(Optional.of(room));
        ResponseEntity<Room> responseEntity = roomRestController.addNewRoom(roomForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getRoomInHotel());
    }

    @Test
    void editRoom() {
        EditRoomDto editRoomDto = new EditRoomDto(150.0,3,"Triple");
        Mockito.when(roomService.updateRoom(Mockito.anyString(),Mockito.any(EditRoomDto.class))).thenReturn(Optional.of(room));

        ResponseEntity<Room> responseEntity = roomRestController.editRoom("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784",editRoomDto);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getRoomInHotel());
    }

}