package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.CardCategory;

@Repository
public interface CategoryRepository extends JpaRepository<CardCategory, Integer> {
    public CardCategory findByName(String name);
}

