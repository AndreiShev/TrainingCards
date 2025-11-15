package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.request.CardRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.dto.response.CardsResponse;
import ru.TrainingCards.mapper.CardCategoryMapper;
import ru.TrainingCards.mapper.CardMapper;
import ru.TrainingCards.service.CardService;
import ru.TrainingCards.service.CategoryService;

@RestController
@RequestMapping("/cards/")
@RequiredArgsConstructor
public class CardController {
    private final CardService cardService;
    private final CardMapper cardMapper;
    private final CardCategoryMapper categoryMapper;
    private final CategoryService categoryService;

    @GetMapping("/")
    public ResponseEntity<CardsResponse> getAllCards() {
        return ResponseEntity.status(HttpStatus.OK).body(cardMapper.CardsToResponse(cardService.getCards()));
    }

    @PostMapping("/add")
    public ResponseEntity<CardResponse> addCard(@RequestBody CardRequest cardRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(
                cardMapper.CardToResponse(
                        cardService.addCard(cardMapper.RequestToCard(cardRequest))));
    }

    @PostMapping("/addCategory")
    public ResponseEntity<CardCategoryResponse> addCategory(@RequestBody CardCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(
                categoryMapper.CardCategoryToResponse(
                        categoryService.save(
                                categoryMapper.CardCategoryRequestToCardCategory(request))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CardResponse> deleteCard(@RequestParam int id) {
        cardService.removeCard(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
