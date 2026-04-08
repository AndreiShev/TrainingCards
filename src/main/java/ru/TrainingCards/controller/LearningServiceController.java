package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.response.LearnCardResponse;
import ru.TrainingCards.service.LearningSessionService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/learning/")
@RequiredArgsConstructor
public class LearningServiceController {
    private final LearningSessionService learningSessionService;

    @GetMapping("/{categoryId}")
    public List<LearnCardResponse> getLearningCards(@PathVariable Integer categoryId) {
        return learningSessionService.getSessionCards(categoryId);
    }



}
