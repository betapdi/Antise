package com.antise.server.entities;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.classes.ApplicationStatus;
import com.antise.server.dto.ApplicationDto;

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
public class Application {
    @Id
    private String id;

    private String jobId;

    private ApplicationStatus status;

    private Date submittedDate;

    public void update(ApplicationDto applicationDto) {
        if (applicationDto.getId() != null) id = applicationDto.getId();
        if (applicationDto.getJobId() != null) jobId = applicationDto.getJobId();
        if (applicationDto.getStatus() != null) status = applicationDto.getStatus();
        if (applicationDto.getSubmittedDate() != null) submittedDate = applicationDto.getSubmittedDate();
    }
}
