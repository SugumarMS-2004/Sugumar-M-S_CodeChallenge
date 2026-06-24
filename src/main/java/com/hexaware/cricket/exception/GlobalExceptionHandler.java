package com.hexaware.cricket.exception;



import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

  
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(reason = "Player not found with the given ID", code = HttpStatus.NOT_FOUND)
    public void handleNotFound() {
      
    }

   
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(reason = "Provided player data failed validation constraints", code = HttpStatus.BAD_REQUEST)
    public void handleValidationError() {
       
    }
}