package ru.TrainingCards.service;

import ru.TrainingCards.dto.request.ReviewCardRequest;

public interface ReviewService {
    /*
    * Отвечает за:
        - принять ответ пользователя
        - вызвать SpacedRepetitionService
        - сохранить изменения
    * */

    public void reviewCard(ReviewCardRequest request);


}
