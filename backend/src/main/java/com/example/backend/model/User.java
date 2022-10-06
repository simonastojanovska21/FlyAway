package com.example.backend.model;

import com.example.backend.model.enumerations.Role;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
@Data
public class User implements UserDetails {
    @Id
    private String username;

    private String password;

    private String name;

    private String surname;

    private String phoneNumber;

    private String address;

    @Enumerated(EnumType.STRING)
    private Role userRole;

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;


    public User()
    {

    }

    public User(String username, String password, String name, String surname, String phoneNumber,String address,Role userRole)
    {
        this.username=username;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.phoneNumber=phoneNumber;
        this.address=address;
        this.userRole=userRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(userRole);
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
