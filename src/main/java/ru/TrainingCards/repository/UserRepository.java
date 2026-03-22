package ru.TrainingCards.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.TrainingCards.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserById(Integer id);

    boolean existsUserByEmail(String email);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByUsername(String username);
}
