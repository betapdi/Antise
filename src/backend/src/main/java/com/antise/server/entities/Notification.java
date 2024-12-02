package com.antise.server.entities;

import java.sql.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.dto.NotificationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notification {
    @Id
    private String id;

    private String title;

    private String message;

    private String recipentId;

    private String type;

    private Date createdAt;

    void update(NotificationDto notificationDto) {
        if (notificationDto.getId() != null) id = notificationDto.getId();
        if (notificationDto.getTitle() != null) title = notificationDto.getTitle();
        if (notificationDto.getMessage() != null) message = notificationDto.getMessage();
        if (notificationDto.getRecipentId() != null) recipentId = notificationDto.getRecipentId();
        if (notificationDto.getType() != null) type = notificationDto.getType();
        if (notificationDto.getCreatedAt() != null) createdAt = notificationDto.getCreatedAt();
    }
}
