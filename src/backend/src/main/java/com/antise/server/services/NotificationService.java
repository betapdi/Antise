package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.NotificationDto;
import com.antise.server.entities.Notification;
import com.antise.server.repositories.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final FileService fileService;

    public NotificationService(NotificationRepository notificationRepository, FileService fileService) {
        this.notificationRepository = notificationRepository;
        this.fileService = fileService;
    }

    public List<NotificationDto> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        List<NotificationDto> notificationDtos = new ArrayList<>();

        for (Notification item : notifications) {
            NotificationDto dto = new NotificationDto();
            dto.update(item);
            notificationDtos.add(dto);
        }

        return notificationDtos;
    }
}
