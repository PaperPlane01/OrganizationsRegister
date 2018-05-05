package org.paperplane.organizationsregister.exception;

public class OrganizationAlreadyExistsException extends RuntimeException {
    public OrganizationAlreadyExistsException() {
    }

    public OrganizationAlreadyExistsException(String message) {
        super(message);
    }

    public OrganizationAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
