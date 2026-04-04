package ru.TrainingCards.service;


import ru.TrainingCards.dto.response.CardResponse;
import java.util.List;

public interface LearningSessionService {
    /*
    * Отвечает за:
        - какую карточку показать сейчас
        - порядок
        - лимиты (20 карточек)
        - смешивание
    * */

    List<CardResponse> getSessionCards(Integer categoryId);
}
