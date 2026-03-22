package ru.TrainingCards.model;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;


import java.time.Instant;

@RedisHash("refresh_tokens")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class RefreshToken {

    @Id
    private Long id;

    private Integer userId;

    private String token;

    private Instant expireDate;
}
