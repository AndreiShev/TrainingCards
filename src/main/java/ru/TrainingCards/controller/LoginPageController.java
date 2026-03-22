package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.TrainingCards.dto.request.LoginRequest;

@Controller
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginPageController {

    @GetMapping
    public String loginForm() {
        return "login";
    }

    @PostMapping
    public String processRegistration(LoginRequest request) {

        return "redirect:/cards";
    }
}
