package com.antise.server.auth.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.auth.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
     
    Optional<User> findByEmail(String email);
}
