package ru.TrainingCards.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import ru.TrainingCards.model.User;
import ru.TrainingCards.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws AuthenticationException {
        User user = userRepository.findUserByUsername(username)
                .orElseThrow(() -> new AuthenticationException("User " + username + " not found") {});

        return new AppUserDetails(user);
    }
}
