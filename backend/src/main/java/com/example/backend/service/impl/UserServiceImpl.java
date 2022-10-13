package com.example.backend.service.impl;

import com.example.backend.model.User;
import com.example.backend.model.dto.RegisterDto;
import com.example.backend.model.enumerations.Role;
import com.example.backend.model.exceptions.InvalidUsernameOrPasswordException;
import com.example.backend.model.exceptions.PasswordsDoNotMatchException;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.model.exceptions.UsernameAlreadyExistsException;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Optional<User> register(RegisterDto registerDto) throws InvalidUsernameOrPasswordException, PasswordsDoNotMatchException,UsernameAlreadyExistsException {

        if(registerDto.getUsername()==null || registerDto.getPassword()==null)
            throw new InvalidUsernameOrPasswordException("The username or password entered is not correct.");
        if(!registerDto.getPassword().equals(registerDto.getRepeatedPassword()))
            throw new PasswordsDoNotMatchException("Entered passwords do not match.");
        if(this.userRepository.findByUsername(registerDto.getUsername()).isPresent())
            throw new UsernameAlreadyExistsException("Username: "+registerDto.getUsername()+" already exists.");
        String encrypted=this.passwordEncoder.encode(registerDto.getPassword());
        User user=new User(registerDto.getUsername(),encrypted,registerDto.getName(),registerDto.getSurname()
                 ,Role.ROLE_USER);
        return Optional.of(this.userRepository.save(user));
    }

    @Override
    public Optional<User> getUserInfo(String username) throws UserNotFoundException {
        Optional<User> user=this.userRepository.findByUsername(username);
        if(user.isEmpty())
            throw new UserNotFoundException(username);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userRepository.findByUsername(s).orElseThrow(()->new UsernameNotFoundException("User with username "+s
                + " is not found"));
    }

}
