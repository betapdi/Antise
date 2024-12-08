package com.antise.server.auth.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
@Document(collection = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder(toBuilder = true)
public class User implements UserDetails {
    @Id
    private String id;
    
    private String phoneNumber;

    @NotBlank(message = "The email field can't be blank")
    @Indexed(unique = true)
    @Email(message = "Please enter email in proper format!")
    private String email;
    
    @NotBlank(message = "The password field can't be blank")
    @Size(min = 5, message = "The password must have at least 5 characters")
    private String password;

    @DocumentReference
    private RefreshToken refreshToken;

    private UserRole role;

    @Builder.Default 
    private boolean isEnabled = true;

    @Builder.Default 
    private boolean isAccountNonExpired = true;

    @Builder.Default 
    private boolean isAccountNonLocked = true;

    @Builder.Default 
    private boolean isCredentialsNonExpired = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
