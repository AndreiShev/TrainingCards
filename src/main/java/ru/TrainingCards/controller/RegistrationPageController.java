package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.TrainingCards.dto.request.UserRequest;
import ru.TrainingCards.security.UserManager;

@Controller
@RequestMapping("/register")
@RequiredArgsConstructor
public class RegistrationPageController {
    private final UserManager userManager;

    @GetMapping
    public String registerForm() {
        return "registration";
    }

    @PostMapping
    public String processRegistration(UserRequest request) {
        userManager.register(request);
        return "redirect:/cards";
    }

}
