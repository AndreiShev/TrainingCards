package ru.TrainingCards.dto.request;


import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ReviewCardRequest {
    private Integer id;
    private String action;
}
