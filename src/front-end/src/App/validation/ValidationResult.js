class ValidationResult {
    constructor(successful, message) {
        this.successful = successful;
        this.message = message;
    }

    isSuccessful() {
        return this.successful;
    }

    getMessage() {
        return this.message;
    }
}

export default ValidationResult;