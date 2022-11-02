package com.example.backend.model.enumerations;

public enum Amenities {
    WIFI("Wi-Fi"),
    PARKING("Parking"),
    AIR_CONDITIONING("A/C"),
    POOL("Pool"),
    FITNESS("Fitness centre"),
    PETS("Pets allowed"),
    BAR("Bar"),
    RESTAURANT("Restaurant"),
    PLAYGROUND("Playground"),
    Business_Center("Business"),
    SPA("Spa"),
    SAFE_DEPOSIT_BOX("Safe");

    public final String label;

    private Amenities(String label) {
        this.label = label;
    }
}
