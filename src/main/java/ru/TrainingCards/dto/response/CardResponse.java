package ru.TrainingCards.dto.response;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CardResponse {
    private int id;
    private String question;
    private String answer;
    private String category;
}
