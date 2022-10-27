package com.example.backend.model.forms;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterForm {

    private String username;

    private String password;

    private String repeatedPassword;

    private String name;

    private String surname;
}