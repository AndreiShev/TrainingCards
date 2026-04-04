package ru.TrainingCards.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

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

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    private Integer repetitions;

    private Integer interval;

    @Column(name = "next_review_at")
    private Instant nextReviewAt;

    @Column(name = "last_reviewed_at")
    private Instant lastReviewedAt;

    @PrePersist
    public void prePersist() {
        if (repetitions == null) repetitions = 0;
        if (interval == null) interval = 0;
        if (nextReviewAt == null) nextReviewAt = Instant.now();
        if (lastReviewedAt == null) lastReviewedAt = Instant.now();
    }

}
