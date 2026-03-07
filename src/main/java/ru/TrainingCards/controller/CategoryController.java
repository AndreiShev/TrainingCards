package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.TrainingCards.dto.request.CardCategoryRequest;
import ru.TrainingCards.dto.response.CardCategoryResponse;
import ru.TrainingCards.service.CategoryService;
import java.util.List;

@RestController
@RequestMapping("/api/v1/cards/")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/")
    public List<CardCategoryResponse> getAllCategoriesAndCards() {
        return categoryService.findAllCategories();
    }

    @PostMapping("/addCategory")
    public ResponseEntity<CardCategoryResponse> addCategory(@RequestBody CardCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.save(request));
    }

    @DeleteMapping("/cardCategory/{id}")
    public ResponseEntity<Void> deleteCardCategory(@PathVariable Integer id) {
        categoryService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
