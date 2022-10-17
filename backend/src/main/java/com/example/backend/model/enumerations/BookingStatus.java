package com.example.backend.model.enumerations;

public enum BookingStatus {
    RESERVED("Reserved"),
    PAID("Paid"),
    FINISHED("Finished"),
    CANCELED("Canceled");

    public final String label;

    private BookingStatus(String label) {
        this.label = label;
    }
}
