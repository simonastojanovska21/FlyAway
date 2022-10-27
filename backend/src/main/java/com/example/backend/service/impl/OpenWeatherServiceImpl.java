package com.example.backend.service.impl;

import com.example.backend.model.Destination;
import com.example.backend.model.dto.WeatherDto;
import com.example.backend.service.DestinationService;
import com.example.backend.service.OpenWeatherService;
import com.example.backend.utils.FormatHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class OpenWeatherServiceImpl implements OpenWeatherService {

    private final DestinationService destinationService;
    private final String apiKey = "30300a57465cfde74331f1316c72f505";

    @Override
    public List<WeatherDto> getWeatherConditionsAboutDestination(String destinationId) throws IOException, InterruptedException {
        Destination destination = this.destinationService.getDestination(destinationId).get();
        ObjectMapper mapper = new ObjectMapper();
        String openWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                destination.getDestinationLocation().getLatitude() +
                "&lon=" + destination.getDestinationLocation().getLongitude()
                + "&exclude=current,minutely,hourly,alerts&units=metric" +
                "&appid=" + apiKey +"";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(openWeatherURL)).build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        List<WeatherDto> weatherDtoList = new ArrayList<>();
        mapper.readTree(response.body()).get("daily").elements().forEachRemaining(node -> {
            WeatherDto weatherDto = new WeatherDto(FormatHelper.formatter.format(Instant.ofEpochSecond(node.get("dt").asLong())),
                    node.get("temp").get("day").asInt(),node.get("temp").get("night").asInt(),
                    node.get("weather").get(0).get("main").toString(), node.get("weather").get(0).get("icon").toString() );
            weatherDtoList.add(weatherDto);
        });
        return weatherDtoList;
    }
}
