package ru.TrainingCards.service;

import ru.TrainingCards.model.CardCategory;

public interface CategoryService {
    public CardCategory findCategoryByName(String name);

    public CardCategory save(CardCategory category);
}
