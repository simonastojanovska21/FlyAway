package com.example.backend.web;

import com.example.backend.model.User;
import com.example.backend.model.enumerations.Role;
import com.example.backend.model.forms.RegisterForm;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@ExtendWith(MockitoExtension.class)
public class AuthenticationRestControllerTest {

    @InjectMocks
    AuthenticationRestController authenticationRestController;

    @Mock
    UserService userService;

    private final User user = new User("test@test.com","P@ssword1","Test name","Test surname", Role.ROLE_USER);
    private final RegisterForm registerForm = new RegisterForm("test@test.com","P@ssword1",
            "P@ssword1","Test name","Test surname");

    @Test
    void getInfoForUser() {

        Mockito.when(userService.getUserInfo(Mockito.any(String.class))).thenReturn(Optional.of(user));

        ResponseEntity<User> responseEntity = authenticationRestController.getInfoForUser("test@test.com");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertEquals(responseEntity.getBody().getUsername(),"test@test.com");
    }

    @Test
    void getInfoForUserEmpty(){
        Mockito.when(userService.getUserInfo(Mockito.any(String.class))).thenReturn(Optional.empty());

        ResponseEntity<User> responseEntity = authenticationRestController.getInfoForUser("test@test.com");
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(400);
        assertNull(responseEntity.getBody());
    }

    @Test
    void registerUser() {
        Mockito.when(userService.register(Mockito.any(RegisterForm.class))).thenReturn(Optional.of(user));

        ResponseEntity<User> responseEntity = authenticationRestController.registerUser(registerForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertNotNull(responseEntity.getBody());
        assertEquals(responseEntity.getBody().getUsername(),"test@test.com");
    }

    @Test
    void registerUserEmpty() {
        Mockito.when(userService.register(Mockito.any(RegisterForm.class))).thenReturn(Optional.empty());

        ResponseEntity<User> responseEntity = authenticationRestController.registerUser(registerForm);
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(400);
        assertNull(responseEntity.getBody());
    }
}