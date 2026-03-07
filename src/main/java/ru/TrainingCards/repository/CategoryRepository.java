package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.CardCategory;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CardCategory, Integer> {
    Optional<CardCategory> findByName(String name);
}

