package ru.TrainingCards.service;

import ru.TrainingCards.model.CardCategory;

import java.util.List;

public interface CategoryService {
    public CardCategory findCategoryByName(String name);

    public List<CardCategory> findAllCategories();

    public CardCategory save(CardCategory category);
}
