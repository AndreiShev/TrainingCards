package ru.TrainingCards.mapper;

import org.springframework.stereotype.Component;
import ru.TrainingCards.dto.request.UserRequest;
import ru.TrainingCards.dto.response.UserResponse;
import ru.TrainingCards.model.User;

@Component
public class UserMapper {
    public User requestToUser(UserRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return user;
    }

    public UserResponse userToResponse(User savedUser) {
        UserResponse userResponse = new UserResponse();
        userResponse.setUsername(savedUser.getUsername());
        userResponse.setEmail(savedUser.getEmail());

        return userResponse;
    }
}
