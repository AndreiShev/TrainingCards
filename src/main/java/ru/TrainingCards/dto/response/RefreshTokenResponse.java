package ru.TrainingCards.dto.response;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RefreshTokenResponse {

    private String accessToken;

    private String refreshToken;
}
