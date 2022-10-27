package com.example.backend.utils;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Locale;

public class FormatHelper {
    public static final String PATTERN_FORMAT = "dd.MM.yyyy";
    public static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern(PATTERN_FORMAT).withZone(ZoneId.systemDefault());

    public static String getISOCountryCodeForCountry(String country){
        return Arrays.stream(Locale.getISOCountries())
                .filter(each-> new Locale("",each).getDisplayCountry().equals(country))
                .findFirst().get();
    }

    public static double[] getLocationCoordinates(String location){
        return Arrays.stream(location.substring(location.indexOf("(")+1, location.indexOf(")")).split(" "))
                .mapToDouble(Double::parseDouble).toArray();
    }
}
