package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.model.Card;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class CardMapper {

    public Card RequestToCard(CardRequest request) {
        Card card = new Card();
        card.setAnswer(request.getAnswer());
        card.setTitle(request.getTitle());
        return card;
    }

    public CardResponse CardToResponse(Card card) {
        CardResponse cardResponse = new CardResponse();
        cardResponse.setId(card.getId());
        cardResponse.setTitle(card.getTitle());
        cardResponse.setAnswer(card.getAnswer());
        cardResponse.setCategory(card.getCategory().getName());
        return cardResponse;
    }

    public List<CardResponse> CardsToResponse(List<Card> cards) {
        ArrayList<CardResponse> cardsResponse = new ArrayList<>();
        if (cards == null || cards.isEmpty()) {
            return cardsResponse;
        }

        for (Card card : cards) {
            CardResponse cardResponse = CardToResponse(card);
            cardsResponse.add(cardResponse);
        }
        return cardsResponse;
    }
}
