package com.antise.server.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.entities.Job;

public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findAllByJobType(String jobType);
}
