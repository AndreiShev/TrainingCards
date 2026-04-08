package ru.TrainingCards.service;

import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.model.Card;

import java.util.List;


public interface CardService {

    List<Card> getCardsEntity();

    public List<CardResponse> getCards();

    List<Card> getCardsEntityByCategory(Integer categoryId);

    public List<CardResponse> getCardsByCategory(Integer id);

    Card getCardEntity(Integer id);

    public CardResponse getCard(Integer id);

    public CardResponse addCard(CardRequest cardRequest);

    public CardResponse updateCard(CardRequest cardRequest);

    public void removeCard(Integer id);

    void removeCards(List<Card> cards);
}
