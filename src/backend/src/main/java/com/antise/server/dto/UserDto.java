package com.antise.server.dto;

import com.antise.server.auth.entities.RefreshToken;
import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.entities.Company;
import com.antise.server.entities.Job;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String id;

    private String username;
    
    private String email;

    private RefreshToken refreshToken;

    private UserRole role;

    public void update(User user) {
        if (user.getId() != null) id = user.getId();
        if (user.getEmail() != null) email = user.getEmail();
        if (user.getRefreshToken() != null) refreshToken = user.getRefreshToken();
        if (user.getRole() != null) role = user.getRole();
    }
}
