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

    private String fullName;
    
    private String email;

    private String phoneNumber;

    private String coverLetter;

    private String applicantId;
    
    private String jobId;
    
    private ApplicationStatus status;
    
    private Date submittedDate;

    private String resumeName;

    private String questions;

    public void update(ApplicationDto applicationDto) {
        if (applicationDto.getFullName() != null) fullName = applicationDto.getFullName();
        if (applicationDto.getEmail() != null) email = applicationDto.getEmail();
        if (applicationDto.getPhoneNumber() != null) phoneNumber = applicationDto.getPhoneNumber();
        if (applicationDto.getCoverLetter() != null) coverLetter = applicationDto.getCoverLetter();
        if (applicationDto.getApplicantId() != null) applicantId = applicationDto.getApplicantId();
        if (applicationDto.getJobId() != null) jobId = applicationDto.getJobId();
        if (applicationDto.getStatus() != null) status = applicationDto.getStatus();
        if (applicationDto.getSubmittedDate() != null) submittedDate = applicationDto.getSubmittedDate();
        if (applicationDto.getResumeUrl() != null) resumeName = applicationDto.getResumeUrl();
        if (applicationDto.getQuestions() != null) questions = applicationDto.getQuestions();
    }
}
