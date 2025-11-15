package ru.TrainingCards.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.model.CardCategory;
import ru.TrainingCards.repository.CategoryRepository;
import ru.TrainingCards.service.CategoryService;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CardCategory findCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    public CardCategory save(CardCategory category) {
        return categoryRepository.save(category);
    }


}
