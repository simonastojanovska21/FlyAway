package com.example.backend.model.enumerations;

public enum RoomType {
    SINGLE("Single"),
    DOUBLE("Double"),
    TRIPLE("Triple"),
    QUAD("Quad"),
    QUEEN("Queen"),
    KING("King"),
    TWIN("Twin"),
    STUDIO("Studio");

    public final String label;

    private RoomType(String label) {
        this.label = label;
    }
}
