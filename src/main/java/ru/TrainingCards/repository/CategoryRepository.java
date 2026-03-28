package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.CardCategory;
import ru.TrainingCards.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CardCategory, Integer> {
    Optional<CardCategory> findByName(String name);

    Optional<CardCategory> findCardCategoriesByIdAndUser(Integer id, User user);

    Optional<List<CardCategory>> findCardCategoriesByUser(User user);
}

