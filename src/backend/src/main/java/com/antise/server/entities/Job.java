package com.antise.server.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.dto.JobDto;

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
public class Job {
    @Id
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

    @Builder.Default
    private List<Application> applications = new ArrayList<>();

    public void update(JobDto dto) {
        if (dto.getTitle() != null) title = dto.getTitle();
        if (dto.getDescription() != null) description = dto.getDescription();
        if (dto.getResponsibility() != null) responsibility = dto.getResponsibility();
        if (dto.getPostedDate() != null) postedDate = dto.getPostedDate();
        if (dto.getExpirationDate() != null) expirationDate = dto.getExpirationDate();
        if (dto.getCompanyId() != null) companyId = dto.getCompanyId();
        if (dto.getMinSalary() != null) minSalary = dto.getMinSalary();
        if (dto.getMaxSalary() != null) maxSalary = dto.getMaxSalary();
        if (dto.getLocation() != null) location = dto.getLocation();
        if (dto.getEducation() != null) education = dto.getEducation();
        if (dto.getJobType() != null) jobType = dto.getJobType();
        if (dto.getExperience() != null) experience = dto.getExperience();
    }
}
