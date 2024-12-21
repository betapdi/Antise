package com.antise.server.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.antise.server.entities.Application;
import com.antise.server.entities.Job;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobDto {
    private String id;

    private String title;

    private String description;

    private String responsibility;

    private Date postedDate;

    private Date expirationDate;

    private String companyId;

    private Integer minSalary;
    
    private Integer maxSalary;

    private String location;

    private String education;

    private String jobType;

    private String experience;

    private List<ApplicationDto> applications;

    private String questions;

    public void update(Job job) {
        if (job.getId() != null) id = job.getId();
        if (job.getTitle() != null) title = job.getTitle();
        if (job.getDescription() != null) description = job.getDescription();
        if (job.getResponsibility() != null) responsibility = job.getResponsibility();
        if (job.getPostedDate() != null) postedDate = job.getPostedDate();
        if (job.getExpirationDate() != null) expirationDate = job.getExpirationDate();
        if (job.getCompanyId() != null) companyId = job.getCompanyId();
        if (job.getMinSalary() != null) minSalary = job.getMinSalary();
        if (job.getMaxSalary() != null) maxSalary = job.getMaxSalary();
        if (job.getLocation() != null) location = job.getLocation();
        if (job.getEducation() != null) education = job.getEducation();
        if (job.getJobType() != null) jobType = job.getJobType();
        if (job.getExperience() != null) experience = job.getExperience();
        if (job.getQuestions() != null) questions = job.getQuestions();
        if (job.getApplications() != null) {
            applications = new ArrayList<>();

            for (Application application : job.getApplications()) {
                ApplicationDto dto = new ApplicationDto();
                dto.update(application);

                applications.add(dto);
            }
        }
    }
}
