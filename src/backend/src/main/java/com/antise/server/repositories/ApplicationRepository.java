package com.antise.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.entities.Application;

public interface ApplicationRepository extends MongoRepository<Application, String> {
     
}
