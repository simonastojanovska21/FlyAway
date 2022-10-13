package com.example.backend.model.dto;

import lombok.Data;

@Data
public class RegisterDto {

    private String username;

    private String password;

    private String repeatedPassword;

    private String name;

    private String surname;

    private String phoneNumber;

    private String address;
}