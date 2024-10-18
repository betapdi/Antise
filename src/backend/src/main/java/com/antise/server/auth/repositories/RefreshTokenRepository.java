package com.antise.server.auth.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.auth.entities.RefreshToken;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
