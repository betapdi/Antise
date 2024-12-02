package com.exceptions;

public class ObjectOwnershipException extends RuntimeException {
    public ObjectOwnershipException() {
        super("User does not owned the object!");
    }

    public ObjectOwnershipException(String message) {
        super(message);
    }
}