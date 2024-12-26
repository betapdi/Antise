package com.antise.server.exceptions;

public class ApplicationNotFoundException extends RuntimeException {
    public ApplicationNotFoundException() {
        super("Application Not Found");
    }

    public ApplicationNotFoundException(String message) {
        super(message);
    }
}