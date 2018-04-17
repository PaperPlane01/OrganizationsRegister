package org.paperplane.organizationsregister.exceptionhandler;

import com.google.common.collect.ImmutableMap;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.exception.*;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.BankNotFoundException;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.OrganizationNotFoundException;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.OrganizationTypeNotFoundException;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.UserNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class RestServiceExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = NoMatchFoundForGivenUsernameAndPasswordException.class)
    protected ResponseEntity<Object> handleNoMatchFoundForGivenUsernameAndPasswordException(RuntimeException exception,
                                                                                            WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(NoMatchFoundForGivenUsernameAndPasswordException.class,
                        "No match has been found for given username and password."),
                new HttpHeaders(), HttpStatus.FORBIDDEN, webRequest);
    }

    @ExceptionHandler(value = TokenExpiredException.class)
    protected ResponseEntity<Object> handleTokenExpiredException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(TokenExpiredException.class, "Token has expired."),
                new HttpHeaders(), HttpStatus.GONE, webRequest);
    }

    @ExceptionHandler(value = InvalidTokenException.class)
    protected ResponseEntity<Object> handleInvalidTokenException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception, createExceptionResponseMap(InvalidTokenException.class,
                "Such token does not exists."),
                new HttpHeaders(), HttpStatus.FORBIDDEN, webRequest);
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    protected ResponseEntity<Object> handleUserNotFoundException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(UserNotFoundException.class, "Such user does not exists."),
                new HttpHeaders(), HttpStatus.NOT_FOUND, webRequest);
    }

    @ExceptionHandler(value = UnauthorizedException.class)
    protected ResponseEntity<Object> handleUnauthorizedException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(UnauthorizedException.class, "This action requires authorization."),
                new HttpHeaders(), HttpStatus.UNAUTHORIZED, webRequest);
    }

    @ExceptionHandler(value = NoAuthorityException.class)
    protected ResponseEntity<Object> handleNoAuthorityException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(NoAuthorityException.class,
                        "You don't have an authority to perform this operation."),
                new HttpHeaders(), HttpStatus.FORBIDDEN, webRequest);
    }

    @ExceptionHandler(value = OrganizationNotFoundException.class)
    public ResponseEntity<Object> handleOrganizationNotFoundException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(OrganizationNotFoundException.class, "Organization not found."),
                new HttpHeaders(), HttpStatus.NOT_FOUND, webRequest);
    }

    @ExceptionHandler(value = OrganizationTypeNotFoundException.class)
    public ResponseEntity<Object> handleOrganizationTypeNotFoundException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(OrganizationTypeNotFoundException.class, "Organization type not found."),
                new HttpHeaders(), HttpStatus.NOT_FOUND, webRequest);
    }

    @ExceptionHandler(value = BankNotFoundException.class)
    public ResponseEntity<Object> handleBankNotFoundException(RuntimeException exception, WebRequest webRequest) {
        return handleExceptionInternal(exception,
                createExceptionResponseMap(BankNotFoundException.class, "Bank not found."),
                new HttpHeaders(),
                HttpStatus.NOT_FOUND, webRequest);
    }

    private Map<String, String> createExceptionResponseMap(Class exceptionClass, String message) {
        return ImmutableMap
                .<String, String>builder()
                .put("exception", exceptionClass.getSimpleName())
                .put("message", message)
                .build();
    }
}