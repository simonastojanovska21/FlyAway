package com.example.backend.model.exceptions;

public class HotelNotFoundException extends RuntimeException{
    public HotelNotFoundException(String message){
        super(message);
    }
}
