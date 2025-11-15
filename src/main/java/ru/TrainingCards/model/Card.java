package ru.TrainingCards.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    private String answer;

    @ManyToOne
    @JoinColumn(name="category_id")
    private CardCategory category;
}
