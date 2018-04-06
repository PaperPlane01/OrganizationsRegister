package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class BankNotFoundException extends CustomEntityNotFoundException {
    public BankNotFoundException() {
    }

    public BankNotFoundException(String message) {
        super(message);
    }

    public BankNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
