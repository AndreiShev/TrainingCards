package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.model.CardCategory;

@Component
@RequiredArgsConstructor
public class CardCategoryMapper {
    public CardCategoryResponse cardCategoryToResponse(CardCategory cardCategory) {
        CardCategoryResponse cardCategoryResponse = new CardCategoryResponse();
        cardCategoryResponse.setId(cardCategory.getId());
        cardCategoryResponse.setName(cardCategory.getName());
        cardCategoryResponse.setDescription(cardCategory.getDescription());

        return cardCategoryResponse;
    }

    public CardCategory cardCategoryRequestToCardCategory(CardCategoryRequest request) {
        CardCategory cardCategory = new CardCategory();
        if (request.getId() != null) {
            cardCategory.setId(request.getId());
        }

        cardCategory.setName(request.getName());
        cardCategory.setDescription(request.getDescription());

        return cardCategory;
    }
}
