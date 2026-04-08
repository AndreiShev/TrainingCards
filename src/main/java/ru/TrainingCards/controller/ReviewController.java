package ru.TrainingCards.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.request.ReviewCardRequest;
import ru.TrainingCards.service.ReviewService;

@RestController
@RequestMapping("/api/v1/review/")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PutMapping
    public ResponseEntity<Void> reviewCard(@RequestBody ReviewCardRequest reviewCardRequest) {
        reviewService.reviewCard(reviewCardRequest);
        return ResponseEntity.ok().build();
    }
}
