package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.model.enumerations.Role;
import com.example.backend.model.exceptions.InvalidUsernameOrPasswordException;
import com.example.backend.model.exceptions.PasswordsDoNotMatchException;
import com.example.backend.model.exceptions.UserNotFoundException;
import com.example.backend.model.exceptions.UsernameAlreadyExistsException;
import com.example.backend.model.forms.RegisterForm;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.impl.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;


@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private User user;

    private final RegisterForm successfulRegisterForm = new RegisterForm("test@test.com","P@ssword1",
            "P@ssword1","Test name","Test surname");
    private final RegisterForm invalidUserNameRegisterForm = new RegisterForm(null,"P@ssword1",
            "P@ssword1","Test name","Test surname");
    private final RegisterForm differentPasswordRegisterForm = new RegisterForm("test@test.com","P@ssword1",
            "testPass","Test name","Test surname");

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userRepository,passwordEncoder);
        user = new User("test@test.com","P@ssword1","Test name","Test surname", Role.ROLE_USER);
        Mockito.lenient().when(this.userRepository.save(Mockito.any(User.class))).thenReturn(user);
        Mockito.lenient().when(this.passwordEncoder.encode(Mockito.any(String.class))).thenReturn("P@ssword1");
    }

    @Test
    void givenValidUserFormData_whenSaveUser_thenReturnUser() {
        Optional<User> registeredUser = this.userService.register(successfulRegisterForm);
        Mockito.verify(this.userRepository).save(user);

        assertTrue(registeredUser.isPresent());
        assertNotNull(registeredUser.get());
        User testUser = registeredUser.get();
        assertEquals(testUser.getUsername(),"test@test.com");
        assertEquals(testUser.getPassword(),"P@ssword1");
        assertEquals(testUser.getName(),"Test name");
        assertEquals(testUser.getSurname(),"Test surname");
        assertEquals(testUser.getUserRole(),Role.ROLE_USER);
    }

    @Test
    void givenInvalidUsernameFormData_whenSaveUser_thenThrowInvalidUsernameOrPasswordException(){
        InvalidUsernameOrPasswordException thrownException = assertThrows(
                InvalidUsernameOrPasswordException.class,
                ()->this.userService.register(invalidUserNameRegisterForm)
        );
        assertEquals(thrownException.getMessage(),"The username or password entered is not correct.");
        Mockito.verify(this.userRepository,Mockito.never()).save(user);
    }

    @Test
    void givenDifferentPasswords_whenSaveUser_thenThrowPasswordsDoNotMatchException(){
        PasswordsDoNotMatchException thrownException = assertThrows(
                PasswordsDoNotMatchException.class,
                ()->this.userService.register(differentPasswordRegisterForm)
        );
        assertEquals(thrownException.getMessage(),"Entered passwords do not match.");
        Mockito.verify(this.userRepository,Mockito.never()).save(user);
    }

    @Test
    void givenExistingUsernameInRegisterForm_whenSave_user_thenThrowUsernameAlreadyExistsException(){
        Mockito.when(this.userRepository.findByUsername(Mockito.any(String.class))).thenReturn(Optional.of(user));
        UsernameAlreadyExistsException thrownException = assertThrows(
                UsernameAlreadyExistsException.class,
                ()->this.userService.register(successfulRegisterForm)
        );
        assertEquals(thrownException.getMessage(),"Username: test@test.com already exists.");
        Mockito.verify(this.userRepository,Mockito.never()).save(user);
    }

    @Test
    void getUserInfoWithValidData(){
        Mockito.when(this.userRepository.findByUsername(Mockito.any(String.class))).thenReturn(Optional.of(user));
        Optional<User> getUserInfoOptional = this.userService.getUserInfo("test@test.com");
        assertTrue(getUserInfoOptional.isPresent());
        assertNotNull(getUserInfoOptional.get());
        User testUser = getUserInfoOptional.get();
        assertEquals(testUser.getUsername(),"test@test.com");
    }

    @Test
    void getUserInfoWithInvalidUsername(){
        Mockito.when(this.userRepository.findByUsername(Mockito.any(String.class))).thenReturn(Optional.empty());
        UserNotFoundException thrownException = assertThrows(
                UserNotFoundException.class,
                ()->this.userService.getUserInfo("random@test.com")
        );
        assertEquals(thrownException.getMessage(),"random@test.com");
    }

}