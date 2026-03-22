package ru.TrainingCards.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.RefreshToken;


import java.util.Optional;

@Repository
public interface RefreshTokenRepositoryAuth extends CrudRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);

    Optional<RefreshToken> findByUserId(Integer userId);

    void deleteByUserId(Integer accountId);
}
