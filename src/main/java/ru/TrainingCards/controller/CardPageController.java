package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.TrainingCards.dto.response.CardCategoriesResponse;
import ru.TrainingCards.mapper.CardCategoryMapper;
import ru.TrainingCards.service.CategoryService;

@Controller
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardPageController {


    @GetMapping
    public String cards() {
        return "cards";
    }
}
