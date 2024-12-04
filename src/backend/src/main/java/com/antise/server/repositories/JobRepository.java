package com.antise.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.entities.Job;

public interface JobRepository extends MongoRepository<Job, String> {
     
}
