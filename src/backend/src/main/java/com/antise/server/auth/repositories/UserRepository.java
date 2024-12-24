package com.antise.server.auth.repositories;

import java.util.List;
import java.util.Optional;

import com.antise.server.entities.Company;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.antise.server.auth.entities.User;

public interface UserRepository extends MongoRepository<User, String> {
     
    Optional<User> findByEmail(String email);

    @Query("{ '_class': 'Company' }")
    List<Company> findAllCompanies();
}
