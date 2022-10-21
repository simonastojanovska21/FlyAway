package com.example.backend.model.forms;

import lombok.Data;

@Data
public class RegisterForm {

    private String username;

    private String password;

    private String repeatedPassword;

    private String name;

    private String surname;

    private String phoneNumber;

    private String address;
}