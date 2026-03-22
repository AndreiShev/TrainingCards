package ru.TrainingCards.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginRequest {
    private String username;
    private String password;
}
