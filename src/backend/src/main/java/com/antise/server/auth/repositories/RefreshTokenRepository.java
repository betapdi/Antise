package com.server.cocoapp.auth.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.server.cocoapp.auth.entities.RefreshToken;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
}
