package com.example.backend.model.exceptions;

public class TripDoesNotExistException extends RuntimeException{
    public TripDoesNotExistException(String message){
        super(message);
    }
}
