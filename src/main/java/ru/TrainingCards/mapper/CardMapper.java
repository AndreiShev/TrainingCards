package ru.TrainingCards.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.dto.response.LearnCardResponse;
import ru.TrainingCards.model.Card;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Component
public class CardMapper {

    public Card requestToCard(CardRequest request) {
        Card card = new Card();
        card.setAnswer(request.getAnswer());
        card.setTitle(request.getTitle());
        return card;
    }

    public CardResponse cardToResponse(Card card) {
        CardResponse cardResponse = new CardResponse();
        cardResponse.setId(card.getId());
        cardResponse.setTitle(card.getTitle());
        cardResponse.setAnswer(card.getAnswer());
        cardResponse.setCategory(card.getCategory().getName());
        return cardResponse;
    }

    public LearnCardResponse cardToLearnResponse(Card card) {
        LearnCardResponse cardResponse = new LearnCardResponse();
        cardResponse.setId(card.getId());
        cardResponse.setTitle(card.getTitle());
        cardResponse.setAnswer(card.getAnswer());
        cardResponse.setRepetitions(card.getRepetitions());
        cardResponse.setInterval(card.getInterval());
        cardResponse.setNextReviewAt(card.getNextReviewAt());
        cardResponse.setLastReviewedAt(card.getLastReviewedAt());

        return cardResponse;
    }

    public List<CardResponse> cardsToResponse(List<Card> cards) {
        ArrayList<CardResponse> cardsResponse = new ArrayList<>();
        if (cards == null || cards.isEmpty()) {
            return cardsResponse;
        }

        for (Card card : cards) {
            CardResponse cardResponse = cardToResponse(card);
            cardsResponse.add(cardResponse);
        }
        return cardsResponse;
    }

    public List<LearnCardResponse> cardsToLearnResponse(List<Card> cards) {
        ArrayList<LearnCardResponse> cardsResponse = new ArrayList<>();
        if (cards == null || cards.isEmpty()) {
            return cardsResponse;
        }

        for (Card card : cards) {
            LearnCardResponse cardResponse = cardToLearnResponse(card);
            cardsResponse.add(cardResponse);
        }
        return cardsResponse;
    }

}
