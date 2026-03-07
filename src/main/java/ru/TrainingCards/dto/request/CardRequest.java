package ru.TrainingCards.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CardRequest {
    private Integer id;
    private String title;
    private String answer;
    private Integer category;
}
