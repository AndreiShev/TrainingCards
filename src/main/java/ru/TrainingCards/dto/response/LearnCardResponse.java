package ru.TrainingCards.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LearnCardResponse {
    private int id;
    private String title;
    private String answer;
    private Integer repetitions;
    private Float interval;
    private Instant nextReviewAt;
    private Instant lastReviewedAt;
}
