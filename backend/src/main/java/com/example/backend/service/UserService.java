package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.forms.RegisterForm;
import com.example.backend.model.exceptions.InvalidUsernameOrPasswordException;
import com.example.backend.model.exceptions.PasswordsDoNotMatchException;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.model.exceptions.UsernameAlreadyExistsException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> register(RegisterForm registerForm) throws InvalidUsernameOrPasswordException, PasswordsDoNotMatchException, UsernameAlreadyExistsException;
    Optional<User> getUserInfo(String username) throws UserNotFoundException;
}
