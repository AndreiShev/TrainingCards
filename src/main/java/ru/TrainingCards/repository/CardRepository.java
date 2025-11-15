package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {

}
