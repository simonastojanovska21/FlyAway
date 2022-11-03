package com.example.backend.web;

import com.example.backend.model.Destination;
import com.example.backend.model.Location;
import com.example.backend.model.dto.BookingDto;
import com.example.backend.model.dto.DestinationDto;
import com.example.backend.model.dto.TouristAttractionDto;
import com.example.backend.model.dto.WeatherDto;
import com.example.backend.model.forms.DestinationForm;
import com.example.backend.service.DestinationService;
import com.example.backend.service.OpenWeatherService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class DestinationRestControllerTest {
    @InjectMocks
    DestinationRestController destinationRestController;

    @Mock
    DestinationService destinationService;

    @Mock
    OpenWeatherService openWeatherService;

    @Test
    void getAllDestinations() {
        List<Destination> destinationList = new ArrayList<>();
        Location location = new Location(UUID.randomUUID(),48.85660171508789,2.352220058441162,"Paris","France");
        destinationList.add(new Destination(UUID.randomUUID(),"https://www.skadden.com/-/media/images/offices/city_london_1440x600_2.jpg",
                "https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1",location));
        destinationList.add(new Destination(UUID.randomUUID(),"https://www.skadden.com/-/media/images/offices/city_london_1440x600_2.jpg",
                "https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1",location));
      Mockito.when(destinationService.getAllDestinations()).thenReturn(destinationList);

        List<Destination> response  = destinationRestController.getAllDestinations();
        assertNotNull(response);
        assertEquals(response.size(),2);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getTopThreeDestinations() {
        List<Destination> destinationList = new ArrayList<>();
        Location location = new Location(UUID.randomUUID(),48.85660171508789,2.352220058441162,"Paris","France");
        destinationList.add(new Destination(UUID.randomUUID(),"https://www.skadden.com/-/media/images/offices/city_london_1440x600_2.jpg",
                "https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1",location));
        destinationList.add(new Destination(UUID.randomUUID(),"https://www.skadden.com/-/media/images/offices/city_london_1440x600_2.jpg",
                "https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1",location));
        destinationList.add(new Destination(UUID.randomUUID(),"https://www.skadden.com/-/media/images/offices/city_london_1440x600_2.jpg",
                "https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1",location));
        Mockito.when(destinationService.findTopThreeDestinations()).thenReturn(destinationList);

        List<Destination> response  = destinationRestController.getTopThreeDestinations();
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getDestinationDetails() {
        Destination destination = new Destination(UUID.fromString("50a716b8-1923-4982-991d-cba5424843d8"),
                "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/Panorama_Berlin_Mitte_GettyImages-648821756_Getty_Images_Foto_bluejayphoto_web.jpg?h=e196f222&itok=o4YCzIik",
                 "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/berlin-guide-lead-2018.jpg?imwidth=680",
                new Location(UUID.randomUUID(),52.52000045776367,13.404999732971191,"Berlin", "Germany"));
        Mockito.when(destinationService.getDestination(Mockito.anyString())).thenReturn(Optional.of(destination));

        ResponseEntity<Destination> responseEntity = destinationRestController.getDestinationDetails("50a716b8-1923-4982-991d-cba5424843d8");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getDestinationLocation());

    }

    @Test
    void getWeatherConditions() throws IOException, InterruptedException {
        List<WeatherDto> weatherDtoList = new ArrayList<>();
        weatherDtoList.add(new WeatherDto("03.11.2022",11, 10, "Clouds", "04d"));
        weatherDtoList.add(new WeatherDto("04.11.2022",12, 10, "Rain", "10d"));
        weatherDtoList.add(new WeatherDto("05.11.2022",10, 7, "Rain", "10d"));
        weatherDtoList.add(new WeatherDto("06.11.2022",9, 8, "Clear", "01d"));
        weatherDtoList.add(new WeatherDto("07.11.2022",10, 10, "Clouds", "04d"));
        weatherDtoList.add(new WeatherDto("08.11.2022",11, 12, "Clouds", "04d"));
        weatherDtoList.add(new WeatherDto("09.11.2022",12, 12, "Rain", "10d"));
        weatherDtoList.add(new WeatherDto("10.11.2022",12, 11, "Rain", "10d"));

        Mockito.when(openWeatherService.getWeatherConditionsAboutDestination(Mockito.anyString())).thenReturn(weatherDtoList);

        List<WeatherDto> response = destinationRestController.getWeatherConditions("50a716b8-1923-4982-991d-cba5424843d8");
        assertNotNull(response);
        assertEquals(response.size(),8);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getDestinationDetailsFromDbpedia() {
        DestinationDto destinationDto = new DestinationDto("Destination abstract for testing","https:test.com",
                "Euro","+33");
        Mockito.when(destinationService.getDestinationDetailsFromDbpedia(Mockito.anyString(),Mockito.anyString())).thenReturn(destinationDto);

        DestinationDto responseEntity = destinationRestController.getDestinationDetailsFromDbpedia("Paris","France");
        assertNotNull(responseEntity);
    }

    @Test
    void getMuseumsForDestination() {
        List<TouristAttractionDto> touristAttractionDtos = new ArrayList<>();
        touristAttractionDtos.add(new TouristAttractionDto("Catacombes de Paris", 48.8337437, 2.3322959, "http://commons.wikimedia.org/wiki/Special:FilePath/Catacombs-700px.jpg",
                "underground ossuary in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto("Musée de l'Armée", 48.8570374, 2.3118779, "http://commons.wikimedia.org/wiki/Special:FilePath/Mus%C3%A9e%20de%20l%27Arm%C3%A9e%2C%20Paris%204%20May%202019.jpg",
                "military museum at the Invalides in Paris"));
        touristAttractionDtos.add(new TouristAttractionDto("Maison de Victor Hugo", 48.8548144,2.3661103,"http://commons.wikimedia.org/wiki/Special:FilePath/PARIS%20Place%20des%20Vosges%2C%20Maison%20de%20Victor%20Hugo%202.jpg",
                "museum dedicated to Victor Hugo in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto("Cité de l'architecture et du patrimoine", 48.8629386, 2.2890051,"http://commons.wikimedia.org/wiki/Special:FilePath/Cite%20de%20l%27architecture%20et%20du%20patrimoine.jpg",
                "architecture museum in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto("Musée du Service de Santé des Armées",48.8403652,2.3414281, "http://commons.wikimedia.org/wiki/Special:FilePath/Mus%C3%A9e%20du%20Service%20de%20Sant%C3%A9%20des%20Arm%C3%A9es%20%40%20Val-de-Gr%C3%A2ce%20%40%20Paris%20%2832578929882%29.jpg",
                "museum in Paris, France"));
        
        Mockito.when(destinationService.getMuseumsForDestination(Mockito.anyString())).thenReturn(touristAttractionDtos);

        List<TouristAttractionDto> response = destinationRestController.getMuseumsForDestination("Paris");
        assertNotNull(response);
        assertEquals(response.size(),5);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getAttractionsForDestination() {
        List<TouristAttractionDto> touristAttractionDtos = new ArrayList<>();
        touristAttractionDtos.add(new TouristAttractionDto("Le Petit Bouillon Pharamond",48.8629978, 2.3484965, "http://commons.wikimedia.org/wiki/Special:FilePath/P1160332%20Paris%20Ier%20rue%20gde%20truanderie%20pharamond%20rwk.jpg",
                "restaurants in Paris"));
        touristAttractionDtos.add(new TouristAttractionDto("Palais du Louvre",48.8605627, 2.3351632, "http://commons.wikimedia.org/wiki/Special:FilePath/Pavillon%20de%20Flore%2C%20Louvre%20Museum%2C%20Paris%205%20November%202019.jpg",
                "former royal palace, now hosting the Louvre Museum in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto( "Tour Eiffel", 48.8585613,2.2947988, "http://commons.wikimedia.org/wiki/Special:FilePath/Tour%20Eiffel%20Wikimedia%20Commons.jpg",
                "tower located on the Champ de Mars in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto("Cimetière du Père-Lachaise", 48.8591436, 2.3922826, "http://commons.wikimedia.org/wiki/Special:FilePath/Pere%20Lachaise%20Chemin%20Errazu.jpg",
                "cemetery in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto( "Grande Mosquée de Paris", 48.842017,2.3546773, "http://commons.wikimedia.org/wiki/Special:FilePath/Grande%20Mosqu%C3%A9e%20de%20Paris.JPG",
                "mosque in France"));
        Mockito.when(destinationService.getAttractionsForDestination(Mockito.anyString())).thenReturn(touristAttractionDtos);

        List<TouristAttractionDto> response = destinationRestController.getAttractionsForDestination("Paris");
        assertNotNull(response);
        assertEquals(response.size(),5);
        response.forEach(Assertions::assertNotNull);

    }

    @Test
    void getRestaurantsForDestination() {
        List<TouristAttractionDto> touristAttractionDtos = new ArrayList<>();
        touristAttractionDtos.add(new TouristAttractionDto("Le Petit Bouillon Pharamond", 48.8629978, 2.3484965,"http://commons.wikimedia.org/wiki/Special:FilePath/P1160332%20Paris%20Ier%20rue%20gde%20truanderie%20pharamond%20rwk.jpg",
                "restaurants in Paris"));
        touristAttractionDtos.add(new TouristAttractionDto("Au Chien qui Fume",48.8613541,2.3448441, "http://commons.wikimedia.org/wiki/Special:FilePath/The%20dog%20who%20smokes%2C%20Paris%202010.jpg",
                "restaurant in Paris, France"));
        touristAttractionDtos.add(new TouristAttractionDto("Bouillon Chartier",48.8719475,2.3430256, "http://commons.wikimedia.org/wiki/Special:FilePath/Bouillon%20Chartier.JPG",
                "restaurant in Paris founded in 1896"));
        Mockito.when(destinationService.getRestaurantsForDestination(Mockito.anyString())).thenReturn(touristAttractionDtos);

        List<TouristAttractionDto> response = destinationRestController.getRestaurantsForDestination("Paris");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getBarsForDestination() {
        List<TouristAttractionDto> touristAttractionDtos = new ArrayList<>();
        touristAttractionDtos.add(new TouristAttractionDto( "Oslo",51.5472152, -0.0554365, "http://commons.wikimedia.org/wiki/Special:FilePath/The%20Coathangers%20-%20Oslo%20Hackney%20-%20Wednesday%2017th%20May%202017%20CoathangersHack170517-14%20%2833974091124%29.jpg",
                "discothèque, bar and food venue located in Hackney Central, East London"));
        touristAttractionDtos.add(new TouristAttractionDto("Le Quecum Bar", 51.4739889, -0.1739457, "http://commons.wikimedia.org/wiki/Special:FilePath/Le%20QuecumBar%2C%20Battersea%2C%20SW11%20%284868666773%29.jpg",
                "building in Battersea, London Borough of Wandsworth, England, UK"));
        Mockito.when(destinationService.getBarsForDestination(Mockito.anyString())).thenReturn(touristAttractionDtos);

        List<TouristAttractionDto> response = destinationRestController.getBarsForDestination("London");
        assertNotNull(response);
        assertEquals(response.size(),2);
        response.forEach(Assertions::assertNotNull);
    }

    @Test
    void getNightClubsForDestination() {
        List<TouristAttractionDto> touristAttractionDtos = new ArrayList<>();
        touristAttractionDtos.add(new TouristAttractionDto("Electric Ballroom", 51.5396481, -0.143056, "http://commons.wikimedia.org/wiki/Special:FilePath/Electric%20Ballroom%20entrance%202.jpg",
                "Performance venue in Camden Town, London, England"));
        touristAttractionDtos.add(new TouristAttractionDto("The Jazz Cafe",51.5386307,-0.1429704, "http://commons.wikimedia.org/wiki/Special:FilePath/De%20La%20Soul%20at%20the%20Jazz%20Cafe.jpg",
                "music venue in Parkway in Camden Town, London, England"));
        touristAttractionDtos.add(new TouristAttractionDto("Milk and Honey", 51.5136288, -0.1366872, "http://commons.wikimedia.org/wiki/Special:FilePath/Milk%20and%20honey%20logo%20july%202009.jpg",
                "London cocktail bar"));

        Mockito.when(destinationService.getNightClubsForDestination(Mockito.anyString())).thenReturn(touristAttractionDtos);

        List<TouristAttractionDto> response = destinationRestController.getNightClubsForDestination("London");
        assertNotNull(response);
        assertEquals(response.size(),3);
        response.forEach(Assertions::assertNotNull);

    }

    @Test
    void addNewDestination() {
        Destination destination = new Destination(UUID.fromString("50a716b8-1923-4982-991d-cba5424843d8"),
                "https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/Panorama_Berlin_Mitte_GettyImages-648821756_Getty_Images_Foto_bluejayphoto_web.jpg?h=e196f222&itok=o4YCzIik",
                "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Europe/Germany/Berlin/berlin-guide-lead-2018.jpg?imwidth=680",
                new Location(UUID.randomUUID(),52.52000045776367,13.404999732971191,"Berlin", "Germany"));
        DestinationForm destinationForm = new DestinationForm("destination image","destination thumbnail",
                "Paris","France");
        Mockito.when(destinationService.addNewDestination(Mockito.any(DestinationForm.class))).thenReturn(Optional.of(destination));

        ResponseEntity<Destination> responseEntity = destinationRestController.addNewDestination(destinationForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertNotNull(responseEntity.getBody().getDestinationLocation());
    }
}