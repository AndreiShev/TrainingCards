package ru.TrainingCards.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.TrainingCards.dto.request.UserRequest;
import ru.TrainingCards.dto.response.UserResponse;
import ru.TrainingCards.exception.AlreadyExistsException;
import ru.TrainingCards.mapper.UserMapper;
import ru.TrainingCards.model.RoleType;
import ru.TrainingCards.model.User;
import ru.TrainingCards.repository.UserRepository;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserManager {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public UserResponse register(UserRequest request) {

        if (userRepository.existsUserByEmail(request.getEmail())) {
            throw new AlreadyExistsException("Email already exists");
        }

        User newUser = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        newUser.setRoles(Collections.singleton(RoleType.ROLE_USER));
        User savedUser = userRepository.save(newUser);
        return userMapper.userToResponse(savedUser);
    }

    public UserResponse login(UserRequest request) {

        return new UserResponse();
    }
}
