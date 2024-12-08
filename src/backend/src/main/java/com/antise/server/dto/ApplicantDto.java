package com.antise.server.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

import com.antise.server.auth.entities.User;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Application;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicantDto extends UserDto {
    private String fullName;

    private Boolean gender;

    private String profileImageUrl;

    private String resumeUrl;
    
    private Date dateOfBirth;
    
    private Integer experience;
    
    private String nationality;
    
    private String major;
    
    private String biography;

    private List<ApplicationDto> applications;

    public void update(Applicant applicant) {
        this.update((User)applicant);
        if (applicant.getFullName() != null) fullName = applicant.getFullName();
        if (applicant.getGender() != null) gender = applicant.getGender();
        if (applicant.getProfileImageName() != null) profileImageUrl = "/image/" + applicant.getProfileImageName();
        if (applicant.getResume() != null) resumeUrl = "/pdf/" + applicant.getResume();
        if (applicant.getDateOfBirth() != null) dateOfBirth = applicant.getDateOfBirth();
        if (applicant.getExperience() != null) experience = applicant.getExperience();
        if (applicant.getNationality() != null) nationality = applicant.getNationality();
        if (applicant.getMajor() != null) major = applicant.getMajor();
        if (applicant.getBiography() != null) biography = applicant.getBiography();
        if (applicant.getApplications() != null) {
            applications = new ArrayList<>();
            
            for (Application application : applicant.getApplications()) {
                ApplicationDto dto = new ApplicationDto();
                dto.update(application);

                applications.add(dto);
            }
        }
    }
}
