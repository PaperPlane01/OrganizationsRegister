package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class CustomEntityNotFoundException extends RuntimeException {
    public CustomEntityNotFoundException() {
    }

    public CustomEntityNotFoundException(String message) {
        super(message);
    }

    public CustomEntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
