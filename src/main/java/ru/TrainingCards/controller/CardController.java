package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.service.CardService;


@RestController
@RequestMapping("/api/v1/cards/")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;

    @PostMapping("/card")
    public ResponseEntity<CardResponse> addCard(@RequestBody CardRequest cardRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.addCard(cardRequest));
    }

    @PutMapping("/card")
    public ResponseEntity<CardResponse> updateCard(@RequestBody CardRequest cardRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cardService.updateCard(cardRequest));
    }

    @DeleteMapping("/card/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Integer id) {
        cardService.removeCard(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
