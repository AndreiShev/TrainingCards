package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.model.CardCategory;

@Component
@RequiredArgsConstructor
public class CardCategoryMapper {
    public CardCategoryResponse CardCategoryToResponse(CardCategory cardCategory) {
        CardCategoryResponse cardCategoryResponse = new CardCategoryResponse();
        cardCategoryResponse.setId(cardCategory.getId());
        cardCategoryResponse.setName(cardCategory.getName());
        cardCategoryResponse.setDescription(cardCategory.getDescription());
        return cardCategoryResponse;
    }

    public CardCategory CardCategoryRequestToCardCategory(CardCategoryRequest response) {
        CardCategory cardCategory = new CardCategory();
        cardCategory.setName(response.getName());
        cardCategory.setDescription(response.getDescription());
        return cardCategory;
    }
}
