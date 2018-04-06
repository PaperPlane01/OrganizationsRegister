package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class TaxesCommitteeNotFoundException extends CustomEntityNotFoundException {
    public TaxesCommitteeNotFoundException() {
    }

    public TaxesCommitteeNotFoundException(String message) {
        super(message);
    }

    public TaxesCommitteeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
