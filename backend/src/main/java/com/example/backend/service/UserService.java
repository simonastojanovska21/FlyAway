package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.dto.RegisterDto;
import com.example.backend.model.exceptions.InvalidUsernameOrPasswordException;
import com.example.backend.model.exceptions.PasswordsDoNotMatchException;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.model.exceptions.UsernameAlreadyExistsException;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<User> register(RegisterDto registerDto) throws InvalidUsernameOrPasswordException, PasswordsDoNotMatchException, UsernameAlreadyExistsException;
    Optional<User> getUserInfo(String username) throws UserNotFoundException;
}
