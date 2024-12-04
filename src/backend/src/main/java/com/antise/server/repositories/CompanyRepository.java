package com.antise.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.entities.Company;

public interface CompanyRepository extends MongoRepository<Company, String> {
     
}
