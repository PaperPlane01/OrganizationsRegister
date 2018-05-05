package org.paperplane.organizationsregister.exception;

public class BankAccountAlreadyExistsException extends RuntimeException {
    public BankAccountAlreadyExistsException() {
    }

    public BankAccountAlreadyExistsException(String message) {
        super(message);
    }

    public BankAccountAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
