package com.antise.server.services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.antise.server.classes.ApplicantNotification;
import com.antise.server.classes.CompanyNotification;

@Service
public class NotificationService {
    public NotificationService() {}

    public CompanyNotification createCompanyNotification(String applicantName, String applicationId) {
        CompanyNotification companyNotification = CompanyNotification.builder()
                                                    .applicationId(applicationId)
                                                    .applicantName(applicantName)
                                                    .createdAt(LocalDateTime.now())
                                                    .status(false)
                                                    .build();
        return companyNotification;
    }

    public ApplicantNotification createApplicantNotification(String companyName, String jobId) {
        ApplicantNotification applicantNotification = ApplicantNotification.builder()
                                                        .companyName(companyName)
                                                        .jobId(jobId)
                                                        .createdAt(LocalDateTime.now())
                                                        .status(false)
                                                        .build();

        return applicantNotification;
    }
}
