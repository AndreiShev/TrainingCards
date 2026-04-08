package ru.TrainingCards.service;


import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.dto.response.LearnCardResponse;

import java.util.List;

public interface LearningSessionService {
    /*
    * Отвечает за:
        - какую карточку показать сейчас
        - порядок
        - лимиты (20 карточек)
        - смешивание
    * */

    List<LearnCardResponse> getSessionCards(Integer categoryId);
}
