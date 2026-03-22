package ru.TrainingCards.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.mapper.CardCategoryMapper;
import ru.TrainingCards.mapper.CardMapper;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.model.CardCategory;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.repository.CategoryRepository;
import ru.TrainingCards.service.CategoryService;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CardCategoryMapper cardCategoryMapper;
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    @Override
    public CardCategory findEntityCategoryById(Integer id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category not found")
        );
    }

    @Override
    public CardCategoryResponse findCategoryById(Integer id) {
        return cardCategoryMapper.CardCategoryToResponse(findEntityCategoryById(id));
    }

    @Override
    public CardCategory findCategoryByName(String name) {
        return categoryRepository.findByName(name).orElseThrow(
                () -> new RuntimeException("Category by name not found")
        );
    }

    @Override
    public List<CardCategoryResponse> findAllCategories() {
        List<CardCategory> cardCategories = categoryRepository.findAll();
        List<CardCategoryResponse> responses = new ArrayList<>();

        for (CardCategory cardCategory : cardCategories) {
            CardCategoryResponse response = cardCategoryMapper.CardCategoryToResponse(cardCategory);
            List<Card> cards = cardRepository.findCardsByCategory(cardCategory.getId()).orElse(List.of());
            response.setCardCount(cards.size());
            response.setCards(cardMapper.CardsToResponse(cards));
            responses.add(response);
        }

        return responses;
    }

    @Override
    public CardCategoryResponse save(CardCategoryRequest request) {
        CardCategory category = cardCategoryMapper.CardCategoryRequestToCardCategory(request);
        return cardCategoryMapper.CardCategoryToResponse(categoryRepository.save(category));
    }

    @Transactional
    @Override
    public void delete(Integer id) {
        CardCategory category = findEntityCategoryById(id);
        cardRepository.deleteByCategoryId(id);
        categoryRepository.delete(category);
    }
}
