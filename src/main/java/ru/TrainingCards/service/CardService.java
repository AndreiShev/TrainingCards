package ru.TrainingCards.service;


import ru.TrainingCards.model.Card;

import java.util.List;

public interface CardService {

    public List<Card> getCards();

    public Card getCard(int id);

    public Card addCard(Card card);

    public Card updateCard(Card card);

    public void removeCard(int id);
}
