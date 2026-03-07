package ru.TrainingCards.service;

import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.model.CardCategory;

import java.util.List;

public interface CategoryService {
    CardCategory findEntityCategoryById(Integer id);

    public CardCategoryResponse findCategoryById(Integer id);

    public CardCategory findCategoryByName(String name);

    public List<CardCategoryResponse> findAllCategories();

    public CardCategoryResponse save(CardCategoryRequest request);

    public void delete(Integer id);
}
