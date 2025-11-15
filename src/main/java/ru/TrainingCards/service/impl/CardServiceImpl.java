package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.service.CardService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;

    @Override
    public List<Card> getCards() {
        return cardRepository.findAll();
    }

    @Override
    public Card getCard(int id) {
        return cardRepository.findById(id).get();
    }

    @Override
    public Card addCard(Card card) {
        return cardRepository.save(card);
    }

    @Override
    public Card updateCard(Card card) {
        Card existCard = getCard(card.getId());
        existCard.setTitle(card.getTitle());
        existCard.setAnswer(card.getAnswer());

        cardRepository.save(existCard);
        return null;
    }

    @Override
    public void removeCard(int id) {
        cardRepository.deleteById(id);
    }
}
