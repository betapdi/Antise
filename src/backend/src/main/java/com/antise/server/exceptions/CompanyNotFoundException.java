package com.antise.server.exceptions;

public class CompanyNotFoundException extends RuntimeException {
    public CompanyNotFoundException() {
        super("Company Not Found");
    }

    public CompanyNotFoundException(String message) {
        super(message);
    }
}