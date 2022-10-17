package com.example.backend.model.enumerations;

public enum Amenities {
    WIFI("Wi-Fi"),
    PARKING("Parking"),
    AIR_CONDITIONING("Air conditioning"),
    POOL("Pool"),
    FITNESS("Fitness centre"),
    PETS("Pets allowed"),
    BAR("Bar"),
    RESTAURANT("Restaurant"),
    PLAYGROUND("Playground"),
    ATM("ATM"),
    SPA("Spa"),
    SAFE_DEPOSIT_BOX("Safe deposit box");

    public final String label;

    private Amenities(String label) {
        this.label = label;
    }
}
