package com.antise.server.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.antise.server.entities.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {
     
}
