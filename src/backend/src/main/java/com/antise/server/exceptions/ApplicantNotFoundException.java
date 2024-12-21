package com.antise.server.exceptions;

public class ApplicantNotFoundException extends RuntimeException {
    public ApplicantNotFoundException() {
        super("Applicant Not Found");
    }

    public ApplicantNotFoundException(String message) {
        super(message);
    }
}