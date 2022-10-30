package com.example.backend.web;

import com.example.backend.model.User;
import com.example.backend.model.forms.RegisterForm;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/authentication")
@AllArgsConstructor
public class AuthenticationRestController {

    private final UserService userService;

    @GetMapping("/userInfo/{username}")
    public ResponseEntity<User> getInfoForUser(@PathVariable String username)
    {
        return this.userService.getUserInfo(username)
                .map(user->ResponseEntity.ok().body(user))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterForm registerForm) {
        return this.userService.register(registerForm)
                .map(user->ResponseEntity.ok().body(user))
                .orElseGet(()->ResponseEntity.badRequest().build());
    }
}
