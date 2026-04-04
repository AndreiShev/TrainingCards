package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.dto.response.CardResponse;
import ru.TrainingCards.mapper.CardMapper;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.security.SecurityUtils;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningSessionServiceImpl implements ru.TrainingCards.service.LearningSessionService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    @Override
    public List<CardResponse> getSessionCards(Integer id) {
        return cardMapper.CardsToResponse(cardRepository.findSessionCard(SecurityUtils.getCurrentUser(), ZonedDateTime.now()).orElseThrow(
                () -> new IllegalArgumentException("Cards not found")
        ));
    }
}
