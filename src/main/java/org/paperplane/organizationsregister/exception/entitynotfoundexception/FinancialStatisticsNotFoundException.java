package org.paperplane.organizationsregister.exception.entitynotfoundexception;

public class FinancialStatisticsNotFoundException extends CustomEntityNotFoundException {
    public FinancialStatisticsNotFoundException() {
    }

    public FinancialStatisticsNotFoundException(String message) {
        super(message);
    }

    public FinancialStatisticsNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
