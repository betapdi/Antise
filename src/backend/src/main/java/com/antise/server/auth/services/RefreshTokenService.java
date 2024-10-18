package com.server.cocoapp.auth.services;

import java.time.Instant;
import java.util.UUID;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.server.cocoapp.auth.entities.RefreshToken;
import com.server.cocoapp.auth.entities.User;
import com.server.cocoapp.auth.repositories.RefreshTokenRepository;
import com.server.cocoapp.auth.repositories.UserRepository;

@Service
public class RefreshTokenService {
    
    private UserRepository userRepository;
    
    private final RefreshTokenRepository refreshTokenRepository;
    
    public RefreshTokenService(UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }
    
    public RefreshToken createRefreshToken(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        
        RefreshToken refToken = user.getRefreshToken();

        if (refToken == null) {
            long refreshTokenDuration = (long)90 * 60 * 60 * 1000 * 24;
            refToken = RefreshToken.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expirationTime(Instant.now().plusMillis(refreshTokenDuration))
                    .user(user)
                    .build();

            refreshTokenRepository.save(refToken);
        }

        return refToken;
    }

    public RefreshToken verifyRefreshToken(String refreshToken) {
        RefreshToken refToken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));
        

        if (refToken.getExpirationTime().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refToken);
            throw new RuntimeException("Refresh token expired!");
        }

        return refToken;
    }
}
