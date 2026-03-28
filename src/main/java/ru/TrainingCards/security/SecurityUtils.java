package ru.TrainingCards.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import ru.TrainingCards.model.User;

public class SecurityUtils {
    public static User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return null;
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof AppUserDetails userDetails) {
            return userDetails.getEntity();
        }

        throw new AccessDeniedException("Invalid authentication");
    }
}
