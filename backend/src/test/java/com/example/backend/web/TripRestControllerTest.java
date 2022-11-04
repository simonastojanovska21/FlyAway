package com.example.backend.web;

import com.example.backend.model.Hotel;
import com.example.backend.model.Location;
import com.example.backend.model.Trip;
import com.example.backend.model.dto.OfferDto;
import com.example.backend.model.dto.TripDetailsDto;
import com.example.backend.model.dto.TripDto;
import com.example.backend.model.forms.TripForm;
import com.example.backend.service.TripService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class TripRestControllerTest {

    @InjectMocks
    TripRestController tripRestController;

    @Mock
    TripService tripService;

    private final List<String> testImages = new ArrayList<>(){{
        add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/bff23bcc_z.jpg");
        add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/dd0ee7a3_z.jpg");
        add("https://i.travelapi.com/hotels/1000000/10000/1900/1872/76525b1a_z.jpg");}};

    private final Hotel hotel = new Hotel(UUID.fromString("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784"),"Libertel Gare Du Nord Suede",
            "Make use of convenient amenities, which include complimentary wireless Internet access and concierge services.",
            "106 Boulevard Magenta","Wi-Fi,A/C,Pets allowed,Restaurant,Business","14","12",3,
            new Location(UUID.randomUUID(),48.87822875802083, 2.355140120471873, "Paris", "France"));

    private final List<TripDto> tripDtoList = new ArrayList<>(){{
        add(new TripDto("278b0ac6-91f5-49b3-8efb-bd2e0edeb5e6","06/11/2022","13/11/2022", 330,
                hotel,testImages,5));
        add(new TripDto("a59d945e-4096-4fe0-bfbb-c1daca5f4b3c","06/11/2022","13/11/2022", 170,
                hotel,testImages,3));
        add(new TripDto( "ab2a6ea8-2b7c-4ccd-9316-c909c167cb4c", "09/11/2022","16/11/2022", 100,
                hotel,testImages,2));
        add(new TripDto("54980f08-de90-4ca4-a344-bdb5af6407c6","13/11/2022","20/11/2022", 550,
                hotel,testImages,4));}};

    private final List<OfferDto> offerDtoList = new ArrayList<>(){{
        add(new OfferDto(  "2a617ead-96ca-4a5f-9b5e-cd550d475493", "421511b7-bfde-4df6-a2e3-03ac1267df9e", "28/11/2022", "05/12/2022",
                "https://i.travelapi.com/hotels/5000000/4250000/4245300/4245201/ebe4d831_z.jpg","New York - USA","Hotel 48LEX New York", 4, 490
        ));
        add(new OfferDto(      "acd2140b-3d66-46f6-a35f-1020013e80e1", "2a0f2fa9-441b-4974-9cb8-94638fb7976e","18/12/2022", "25/12/2022",
                "https://i.travelapi.com/hotels/3000000/2690000/2684500/2684407/46d60e23_z.jpg","Berlin - Germany","Hotel Europa City",3, 75
        ));
        add(new OfferDto( "e63d8383-0957-49f3-953e-d3c3632ec12d","aa22e27d-4e82-42fa-a56c-d522e29a06d0","24/11/2022", "01/12/2022",
                "https://i.travelapi.com/hotels/25000000/24470000/24463300/24463268/1f914fbe_z.jpg","Rome - Italy", "The Hive Hotel", 4,110));
    }};


    @Test
    void getAllTrips() {
        Mockito.when(tripService.getAllTrips()).thenReturn(tripDtoList);

        List<TripDto> response = tripRestController.getAllTrips();
        assertNotNull(response);
        assertEquals(response.size(),4);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getAllTripsForDestination() {
        Mockito.when(tripService.getTripsForDestination(Mockito.anyString())).thenReturn(tripDtoList);

        List<TripDto> response = tripRestController.getAllTripsForDestination("Paris");
        assertNotNull(response);
        assertEquals(response.size(),4);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void tripsForDestinationAndTime() {
        Mockito.when(tripService.getTripsForDestinationAndTime(Mockito.anyString(),Mockito.anyString(),Mockito.anyString())).thenReturn(tripDtoList);

        List<TripDto> response = tripRestController.tripsForDestinationAndTime("Paris","11/11/2022","18/11/2022");
        assertNotNull(response);
        assertEquals(response.size(),4);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void tripsForTime() {
        Mockito.when(tripService.getTripsForTime(Mockito.anyString(),Mockito.anyString())).thenReturn(tripDtoList);

        List<TripDto> response = tripRestController.tripsForTime("11/11/2022","18/11/2022");
        assertNotNull(response);
        assertEquals(response.size(),4);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getTopThreeOffers() {
        Mockito.when(tripService.getTopThreeOffers()).thenReturn(offerDtoList);

        List<OfferDto> response = tripRestController.getTopThreeOffers();
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getTopThreeOffersForDestination() {
        Mockito.when(tripService.getTripsForDestination(Mockito.anyString())).thenReturn(tripDtoList.subList(0,3));

        List<TripDto> response = tripRestController.getAllTripsForDestination("Paris");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getTripDetails() {
        TripDetailsDto tripDetailsDto = new TripDetailsDto("2a617ead-96ca-4a5f-9b5e-cd550d475493","28/11/2022",
                "05/12/2022", 8, hotel);
        Mockito.when(tripService.getTripDetails(Mockito.anyString())).thenReturn(Optional.of(tripDetailsDto));

        ResponseEntity<TripDetailsDto> responseEntity = tripRestController.getTripDetails("2a617ead-96ca-4a5f-9b5e-cd550d475493");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getTripInHotel());
    }

    @Test
    void addNewTrip() {
        TripForm tripForm = new TripForm("b80b1bdf-0a84-4dbc-9f2c-9db3f1296784",new HashMap<>() {{
            put("Triple", 150.0);
            put("Single", 100.0);
            put("Twin", 160.0);
        }},LocalDate.now(),LocalDate.now());
        Trip trip = new Trip(UUID.randomUUID(),LocalDate.now(),LocalDate.now(),hotel);
        Mockito.when(tripService.addNewTrip(Mockito.any(TripForm.class))).thenReturn(java.util.Optional.of(trip));

        ResponseEntity<Trip> responseEntity = tripRestController.addNewTrip(tripForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getTripInHotel());
    }
}