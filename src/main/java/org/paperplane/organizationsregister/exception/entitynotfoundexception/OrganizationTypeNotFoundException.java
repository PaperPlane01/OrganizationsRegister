package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class OrganizationTypeNotFoundException extends CustomEntityNotFoundException {
    public OrganizationTypeNotFoundException() {
    }

    public OrganizationTypeNotFoundException(String message) {
        super(message);
    }

    public OrganizationTypeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
