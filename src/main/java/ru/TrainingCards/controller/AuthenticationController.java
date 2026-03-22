package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.request.UserRequest;
import ru.TrainingCards.dto.response.UserResponse;
import ru.TrainingCards.security.UserManager;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserManager securityService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(securityService.register(userRequest));
    }
}
