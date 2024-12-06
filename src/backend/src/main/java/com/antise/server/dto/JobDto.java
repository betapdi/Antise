package com.antise.server.dto;

import java.util.ArrayList;
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

    private Long postedDate;

    private Long expiredDate;

    private String companyId;

    private String salaryRange;

    private String location;

    private String education;

    private String jobType;

    private String experience;

    private List<ApplicationDto> applications;

    public void update(Job job) {
        if (job.getId() != null) id = job.getId();
        if (job.getTitle() != null) title = job.getTitle();
        if (job.getDescription() != null) description = job.getDescription();
        if (job.getResponsibility() != null) responsibility = job.getResponsibility();
        if (job.getPostedDate() != null) postedDate = job.getPostedDate();
        if (job.getExpiredDate() != null) expiredDate = job.getExpiredDate();
        if (job.getCompanyId() != null) companyId = job.getCompanyId();
        if (job.getSalaryRange() != null) salaryRange = job.getSalaryRange();
        if (job.getLocation() != null) location = job.getLocation();
        if (job.getEducation() != null) education = job.getEducation();
        if (job.getJobType() != null) jobType = job.getJobType();
        if (job.getExperience() != null) experience = job.getExperience();
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
