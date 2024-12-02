package com.exceptions;

public class JobNotFoundException extends RuntimeException {
    public JobNotFoundException() {
        super("Job Not Found");
    }

    public JobNotFoundException(String message) {
        super(message);
    }
}