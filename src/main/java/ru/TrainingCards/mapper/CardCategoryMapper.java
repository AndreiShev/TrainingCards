package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoriesResponse;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.model.CardCategory;
import java.util.List;

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

    public CardCategory CardCategoryRequestToCardCategory(CardCategoryRequest request) {
        CardCategory cardCategory = new CardCategory();
        if (request.getId() != null) {
            cardCategory.setId(request.getId());
        }

        cardCategory.setName(request.getName());
        cardCategory.setDescription(request.getDescription());

        return cardCategory;
    }

    public CardCategoriesResponse CardCategoriesToResponse(List<CardCategory> cardCategories) {
        CardCategoriesResponse cardCategoriesResponse = new CardCategoriesResponse();

        if(cardCategories == null || cardCategories.isEmpty()) {
            return cardCategoriesResponse;
        }

        List<CardCategoryResponse> cardCategoriesResponses = cardCategoriesResponse.getCardCategories();
        for (CardCategory cardCategory : cardCategories) {
            cardCategoriesResponses.add(CardCategoryToResponse(cardCategory));
        }
        return cardCategoriesResponse;
    }


}
