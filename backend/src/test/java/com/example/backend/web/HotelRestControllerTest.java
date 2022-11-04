package com.example.backend.web;

import com.example.backend.model.Hotel;
import com.example.backend.model.Location;
import com.example.backend.model.dto.*;
import com.example.backend.model.forms.HotelForm;
import com.example.backend.service.HotelService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@ExtendWith(MockitoExtension.class)
class HotelRestControllerTest {

    @InjectMocks
    HotelRestController hotelRestController;

    @Mock
    HotelService hotelService;

    @Test
    void getHotelAmenities() {
        List<String> result = hotelRestController.getHotelAmenities();

        assertNotNull(result);
        assertEquals(result.size(),12);
    }

    @Test
    void getAdminHotelList() {
        List<HotelItem> hotelItems = new ArrayList<>();
        hotelItems.add(new HotelItem(UUID.fromString("ff7345ba-bdf6-4464-98ed-4f9bf3095337"),"Pestana Hotel","London",
                new HashMap<>() {{
                    put("Triple", 1);
                    put("Single", 0);
                    put("Double", 1);
                    put("Studio", 0);
                    put("Twin", 1);
                }}));
        hotelItems.add(new HotelItem(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede","Paris",
                new HashMap<>() {{
                    put("Triple", 0);
                    put("Single", 1);
                    put("Double", 1);
                    put("Studio", 0);
                    put("Twin", 0);
                }}));
        hotelItems.add(new HotelItem(UUID.fromString("d2414a36-f45c-42d5-9d56-b742c2468d7c"),"Crowne Plaza Paris","Paris",
                new HashMap<>() {{
                    put("Triple", 1);
                    put("Single", 0);
                    put("Double", 1);
                    put("Studio", 0);
                    put("Twin", 1);
                }}));
        Mockito.when(hotelService.getAdminHotelList()).thenReturn(hotelItems);

        List<HotelItem> response = hotelRestController.getAdminHotelList();
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getDetailsAboutHotel() {
        Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
                new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
        Mockito.when(hotelService.getHotelDetails(Mockito.anyString())).thenReturn(Optional.of(hotel));

        ResponseEntity<Hotel> response = hotelRestController.getDetailsAboutHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getHotelLocation());
    }

    @Test
    void getHotelsNameAndId() {
        List<HotelNameIdDto> hotelNameIdDtoList = new ArrayList<>();
        hotelNameIdDtoList.add(new HotelNameIdDto("ff7345ba-bdf6-4464-98ed-4f9bf3095337","Pestana Hotel"));
        hotelNameIdDtoList.add(new HotelNameIdDto("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784","Libertel Gare Du Nord Suede"));
        hotelNameIdDtoList.add(new HotelNameIdDto("d2414a36-f45c-42d5-9d56-b742c2468d7c","Crowne Plaza Paris"));
        hotelNameIdDtoList.add(new HotelNameIdDto("aa22e27d-4e82-42fa-a56c-d522e29a06d0","The Hive Hotel"));

        Mockito.when(hotelService.getHotelsNameAndId()).thenReturn(hotelNameIdDtoList);

        List<HotelNameIdDto> response = hotelRestController.getHotelsNameAndId();
        assertNotNull(response);
        assertEquals(response.size(),4);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getTripInHotelDetails() {
        List<RoomDto> roomDtoList = new ArrayList<>();
        roomDtoList.add(new RoomDto("7700d715-7e39-4159-ab62-b770edce00a7", "Single",1,true,100,
                new ArrayList<>(){{
            add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/715cc107_z.jpg");
            add( "https://i.travelapi.com/hotels/1000000/10000/1900/1872/e2a38516_z.jpg");}}));
        roomDtoList.add(new RoomDto("6fed3817-1957-43d4-9965-3458f67bd810", "Double",2,true,130,
                new ArrayList<>(){{
                    add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/715cc107_z.jpg");
                    add( "https://i.travelapi.com/hotels/1000000/10000/1900/1872/e2a38516_z.jpg");}}));
        TripInHotelDetailsDto tripInHotelDetailsDto = new TripInHotelDetailsDto(new HotelReviewDto("Customer name Customer surname",
                 "2022-10-30", "If you want hotel staff walking into your room without knocking, stay here. ", 1,
               "Libertel Gare Du Nord Suede"),new ArrayList<>(){{
                   add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg");
                   add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/dd0ee7a3_z.jpg");
                   add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/76525b1a_z.jpg");}},roomDtoList);
        Mockito.when(hotelService.getTripInHotelDetails(Mockito.anyString(),Mockito.anyString())).thenReturn(tripInHotelDetailsDto);
        TripInHotelDetailsDto response = hotelRestController.getTripInHotelDetails("ab2a6ea8-2b7c-4ccd-9316-c909c167cb4c",
                "b80b1bdf-0a84-4dbc-9f2c-9db3f1296784");
        assertNotNull(response);
        assertNotNull(response.getAllImagesForHotel());
        assertNotNull(response.getHotelReviewDto());
        assertNotNull(response.getRoomsInHotel());
        response.getRoomsInHotel().forEach(Assertions::assertNotNull);
    }

    @Test
    void addNewHotel() {
        HotelForm hotelForm = new HotelForm("Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "106 Boulevard Magenta","Paris",
                "France","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",
                48.87822875802083, 2.355140120471873,3, new ArrayList<>(){{
                    add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg");
                    add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/dd0ee7a3_z.jpg");
                    add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/76525b1a_z.jpg");}});
        Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
                new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
        Mockito.when(hotelService.addNewHotel(Mockito.any(HotelForm.class))).thenReturn(Optional.of(hotel));
        ResponseEntity<Hotel> response = hotelRestController.addNewHotel(hotelForm);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getHotelLocation());
    }

    @Test
    void editHotel() {
        EditHotelDto editHotelDto = new EditHotelDto("Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3);
        Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
                "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
                "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
                new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));
        Mockito.when(hotelService.updateHotel(Mockito.anyString(),Mockito.any(EditHotelDto.class))).thenReturn(Optional.of(hotel));

        ResponseEntity<Hotel> response = hotelRestController.editHotel("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784",editHotelDto);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(response.getBody());
        assertNotNull(response.getBody().getHotelLocation());
    }
}