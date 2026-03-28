package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.model.CardCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {

    @Query("SELECT c FROM Card c WHERE c.category.id = ?1")
    Optional<List<Card>> findCardsByCategory(Integer id);

    @Modifying
    @Query("delete from Card c where c.category.id = ?1")
    void deleteByCategoryId(Integer categoryId);

    Optional<Card> findCardByIdAndCategory(Integer id, CardCategory category);


}
