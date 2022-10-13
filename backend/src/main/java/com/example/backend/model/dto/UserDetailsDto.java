package com.example.backend.model.dto;

import com.example.backend.model.User;
import com.example.backend.model.enumerations.Role;
import lombok.Data;

@Data
public class UserDetailsDto {
    private String username;
    private Role role;

    public static UserDetailsDto of(User user) {
        UserDetailsDto details = new UserDetailsDto();
        details.username = user.getUsername();
        details.role = user.getUserRole();
        return details;
    }
}
