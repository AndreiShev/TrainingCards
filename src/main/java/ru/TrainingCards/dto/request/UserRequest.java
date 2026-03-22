package ru.TrainingCards.dto.request;

import lombok.*;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UserRequest {
    private String username;
    private String email;
    private String password;
}
