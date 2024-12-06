package com.antise.server.exceptions;

public class UserRoleNotQualifiedException extends RuntimeException {
    
    public UserRoleNotQualifiedException() {
        super("UserRole is not qualified!");
    }

    public UserRoleNotQualifiedException(String message) {
        super(message);
    }
}