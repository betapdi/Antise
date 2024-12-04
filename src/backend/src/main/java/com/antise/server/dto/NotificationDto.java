package com.antise.server.dto;

import com.antise.server.entities.Notification;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NotificationDto {
    private String id;

    private String title;

    private String message;

    private String recipentId;

    private String type;

    private Date createdAt;

    public void update(Notification notification) {
        if (notification.getId() != null) id = notification.getId();
        if (notification.getTitle() != null) title = notification.getTitle();
        if (notification.getMessage() != null) message = notification.getMessage();
        if (notification.getRecipentId() != null) recipentId = notification.getRecipentId();
        if (notification.getType() != null) type = notification.getType();
        if (notification.getCreatedAt() != null) createdAt = notification.getCreatedAt();
    }
}
