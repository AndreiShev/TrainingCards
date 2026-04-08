package ru.TrainingCards.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.TrainingCards.dto.response.LearnCardResponse;
import ru.TrainingCards.mapper.CardMapper;
import ru.TrainingCards.repository.CardRepository;
import ru.TrainingCards.security.SecurityUtils;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningSessionServiceImpl implements ru.TrainingCards.service.LearningSessionService {
    private final CardRepository cardRepository;
    private final CardMapper cardMapper;

    @Override
    public List<LearnCardResponse> getSessionCards(Integer id) {
        return cardMapper.cardsToLearnResponse(cardRepository.findSessionCard(SecurityUtils.getCurrentUser(), Instant.now()));
    }
}
