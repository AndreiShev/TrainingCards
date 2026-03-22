package ru.TrainingCards.dto.response;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserResponse {
    private String email;
    private String username;
}
