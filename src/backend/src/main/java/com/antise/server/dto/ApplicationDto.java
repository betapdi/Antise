package com.antise.server.dto;

import java.util.Date;

import com.antise.server.classes.ApplicationStatus;
import com.antise.server.entities.Application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicationDto {
    private String id;

    private String jobId;

    private ApplicationStatus status;

    private Date submittedDate;

    public void update(Application application) {
        if (application.getId() != null) id = application.getId();
        if (application.getJobId() != null) jobId = application.getJobId();
        if (application.getStatus() != null) status = application.getStatus();
        if (application.getSubmittedDate() != null) submittedDate = application.getSubmittedDate();
    }
}
