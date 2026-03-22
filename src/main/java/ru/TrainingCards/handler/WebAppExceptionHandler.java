package ru.TrainingCards.handler;


import org.hibernate.exception.ConstraintViolationException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.TrainingCards.dto.response.ErrorResponse;
import ru.TrainingCards.exception.AlreadyExistsException;
import ru.TrainingCards.exception.EntityNotFoundException;
import ru.TrainingCards.exception.RefreshTokenException;


import java.util.List;

@RestControllerAdvice
public class WebAppExceptionHandler {

    @ExceptionHandler(value = RefreshTokenException.class)
    public ResponseEntity<ErrorResponse> refreshTokenExceptionHandler(RefreshTokenException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(value = AlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> alreadyExistHandler(AlreadyExistsException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage());
    }

    @ExceptionHandler(value = EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> notFoundHandler(EntityNotFoundException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> notValid(MethodArgumentNotValidException ex) {
        BindingResult bindingResult = ex.getBindingResult();
        List<String> errorMessages = bindingResult.getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();

        String errorMessage = String.join("; ", errorMessages);
        return buildResponse(HttpStatus.BAD_REQUEST, errorMessage);
    }


    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> notValid(ConstraintViolationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage());
    }


    @ExceptionHandler(value = BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> alreadyExistHandler(BadCredentialsException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage());
    }

    private ResponseEntity<ErrorResponse> buildResponse(HttpStatus httpStatus, String message) {
        return ResponseEntity.status(httpStatus)
                .body(ErrorResponse.builder()
                        .errorDescription(message)
                        .build());
    }
}
