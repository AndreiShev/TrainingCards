package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.model.CardCategory;
import ru.TrainingCards.model.User;

import java.time.Instant;
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

    @Query("select c from Card c where c.user = ?1 and c.nextReviewAt < ?2 order by c.nextReviewAt desc")
    List<Card> findSessionCard(User user, Instant now);

    Optional<Card> findCardByIdAndUser(Integer id, User user);


}
