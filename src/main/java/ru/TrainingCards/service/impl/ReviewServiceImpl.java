package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.dto.request.ReviewCardRequest;
import ru.TrainingCards.model.Card;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.service.CardService;
import ru.TrainingCards.service.ReviewService;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final Map<String, Duration> defaultIntervals = Map.of(
            "again", Duration.ofMinutes(1),
            "hard", Duration.ofMinutes(8),
            "normal", Duration.ofMinutes(15),
            "easy", Duration.ofDays(1)
    );
    private final Float minInterval = 60f;
    private final Float maxInterval = (float) Duration.ofDays(180).getSeconds();
    private final Float minEasyFactor = 1.3f;
    private final CardRepository cardRepository;
    private final CardService cardService;

    @Override
    public void reviewCard(ReviewCardRequest request) {
        Card card = cardService.getCardEntity(request.getId());

        if (card.getRepetitions() == 0) {
            card.setRepetitions(1);
            card.setInterval((float) defaultIntervals.get(request.getAction()).getSeconds());
            card.setNextReviewAt(Instant.now().plusSeconds(defaultIntervals.get(request.getAction()).getSeconds()));
            card.setLastReviewedAt(Instant.now());

            cardRepository.save(card);
            return;
        }

        float easyFactor;

        switch (request.getAction()) {
            case "repeat":
                card.setRepetitions(0);
                easyFactor = Math.max(card.getEasyFactor() - 0.2f, minEasyFactor);
                card.setEasyFactor(easyFactor);
                card.setInterval(minInterval);
                break;
            case "hard":
                card.setRepetitions(card.getRepetitions() + 1);
                easyFactor = Math.max(card.getEasyFactor() - 0.1f, minEasyFactor);
                card.setEasyFactor(easyFactor);
                card.setInterval(Math.max(card.getInterval() * card.getEasyFactor() * 1.2f, maxInterval));
                break;
            case "normal":
                card.setRepetitions(card.getRepetitions() + 1);
                card.setInterval(Math.max(card.getInterval() * card.getEasyFactor() * 1.5f, maxInterval));
                break;
            case "easy":
                card.setRepetitions(card.getRepetitions() + 1);
                card.setEasyFactor(card.getEasyFactor() + 0.1f);
                card.setInterval(Math.max(card.getInterval() * card.getEasyFactor() * 2f, maxInterval));
                break;
        }

        card.setNextReviewAt(Instant.now().plusSeconds(Math.round(card.getInterval())));
        cardRepository.save(card);
    }
}

