package com.example.backend.model.enumerations;

public enum BookingStatus {
    RESERVED("Reserved"),
    PAID("Paid"),
    CANCELED("Canceled");

    public final String label;

    private BookingStatus(String label) {
        this.label = label;
    }
}
