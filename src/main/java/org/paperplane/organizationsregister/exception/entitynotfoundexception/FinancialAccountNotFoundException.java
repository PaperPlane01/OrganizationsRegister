package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class FinancialAccountNotFoundException extends CustomEntityNotFoundException {
    public FinancialAccountNotFoundException() {
    }

    public FinancialAccountNotFoundException(String message) {
        super(message);
    }

    public FinancialAccountNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
