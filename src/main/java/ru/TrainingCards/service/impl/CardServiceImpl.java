package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.mapper.CardMapper;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.service.CardService;
import ru.TrainingCards.service.CategoryService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;
    private final CategoryService categoryService;

    @Override
    public List<Card> getCardsEntity() {
        return cardRepository.findAll();
    }

    @Override
    public List<CardResponse> getCards() {
        return cardMapper.CardsToResponse(getCardsEntity());
    }

    @Override
    public List<Card> getCardsEntityByCategory(Integer categoryId) {
        return cardRepository.findCardsByCategory(categoryId).orElse(List.of());
    }

    @Override
    public List<CardResponse> getCardsByCategory(Integer id) {
        return cardMapper.CardsToResponse(getCardsEntityByCategory(id));
    }

    @Override
    public Card getCardEntity(Integer id) {
        return cardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Card not found")
        );
    };

    @Override
    public CardResponse getCard(Integer id) {
        return cardMapper.CardToResponse(getCardEntity(id));
    }

    @Override
    public CardResponse addCard(CardRequest request) {
        //Пока что работает как проверка привязки к пользователю
        categoryService.findCategoryById(request.getCategory());

        Card card = cardMapper.RequestToCard(request);
        card.setCategory(categoryService.findEntityCategoryById(request.getCategory()));

        return cardMapper.CardToResponse(cardRepository.save(card));
    }

    @Override
    public CardResponse updateCard(CardRequest request) {
        //Пока что работает как проверка привязки к пользователю
        categoryService.findCategoryById(request.getCategory());

        Card existCard = getCardEntity(request.getId());
        existCard.setTitle(request.getTitle());
        existCard.setAnswer(request.getAnswer());
        //existCard.setCategory(categoryService.findEntityCategoryById(request.getCategory()));

        return cardMapper.CardToResponse(cardRepository.save(existCard));
    }

    @Override
    public void removeCard(Integer id) {
        Card card = getCardEntity(id);
        cardRepository.delete(card);
    }

    @Override
    public void removeCards(List<Card> cards) {
        cardRepository.deleteAll(cards);
    }
}
