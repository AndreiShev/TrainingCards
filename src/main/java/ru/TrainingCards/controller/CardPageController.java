package ru.TrainingCards.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.TrainingCards.service.CategoryService;

@Controller
@RequestMapping("/cards")
@RequiredArgsConstructor
public class CardPageController {
    private final CategoryService categoryService;

    @GetMapping
    public String cards(Model model) {
        model.addAttribute("cardCategories", categoryService.findAllCategories());

        return "cards";
    }
}
