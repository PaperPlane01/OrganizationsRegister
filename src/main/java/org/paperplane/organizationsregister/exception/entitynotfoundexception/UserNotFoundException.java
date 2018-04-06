package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class UserNotFoundException extends CustomEntityNotFoundException {
    public UserNotFoundException() {
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
