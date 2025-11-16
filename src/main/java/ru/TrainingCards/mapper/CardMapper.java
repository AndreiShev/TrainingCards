package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.dto.response.CardsResponse;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.service.CategoryService;

import java.util.List;

@RequiredArgsConstructor
@Component
public class CardMapper {
    private final CategoryService categoryService;

    public Card RequestToCard(CardRequest request) {
        Card card = new Card();
        card.setAnswer(request.getAnswer());
        card.setTitle(request.getTitle());
        card.setCategory(categoryService.findCategoryByName(request.getCategory()));
        return card;
    }

    public CardResponse CardToResponse(Card card) {
        CardResponse cardResponse = new CardResponse();
        cardResponse.setId(card.getId());
        cardResponse.setQuestion(card.getTitle());
        cardResponse.setAnswer(card.getAnswer());
        cardResponse.setCategory(card.getCategory().getName());
        return cardResponse;
    }

    public CardsResponse CardsToResponse(List<Card> cards) {
        CardsResponse cardsResponse = new CardsResponse();

        if (cards == null || cards.isEmpty()) {
            return cardsResponse;
        }

        List<CardResponse> responses = cardsResponse.getCards();
        for (Card card : cards) {
            CardResponse cardResponse = CardToResponse(card);
            responses.add(cardResponse);
        }
        return cardsResponse;
    }
}
