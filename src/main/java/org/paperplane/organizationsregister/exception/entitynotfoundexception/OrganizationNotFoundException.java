package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class OrganizationNotFoundException extends CustomEntityNotFoundException {
    public OrganizationNotFoundException() {
    }

    public OrganizationNotFoundException(String message) {
        super(message);
    }

    public OrganizationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
