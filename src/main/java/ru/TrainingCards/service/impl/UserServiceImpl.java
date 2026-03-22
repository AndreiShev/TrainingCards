package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.model.User;
import ru.TrainingCards.repository.UserRepository;
import ru.TrainingCards.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public User getUserById(Integer id) {
        return userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User with id " + id + " not found")
        );
    }
}
