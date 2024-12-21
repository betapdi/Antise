package com.antise.server.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;

import com.antise.server.auth.entities.User;
import com.antise.server.entities.Applicant;
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
public class ApplicantDto extends UserDto {
    private Boolean gender;

    private String fullName;

    private String profileImageUrl;

    private String resumeUrl;
    
    private Date dateOfBirth;
    
    private String experience;

    private String education;
    
    private String nationality;
    
    private String major;
    
    private String biography;

    private String address;

    private String workEmail;

    private String phoneNumber;

    private List<JobDto> favoriteJobs;

    private List<ApplicationDto> applications;

    public void update(Applicant applicant) {
        this.update((User)applicant);
        if (applicant.getGender() != null) gender = applicant.getGender();
        if (applicant.getFullName() != null) fullName = applicant.getFullName();
        if (applicant.getMajor() != null) major = applicant.getMajor();
        if (applicant.getProfileImageName() != null) profileImageUrl = "/image/" + applicant.getProfileImageName();
        if (applicant.getResumeName() != null) resumeUrl = "/pdf/" + applicant.getResumeName();
        if (applicant.getDateOfBirth() != null) dateOfBirth = applicant.getDateOfBirth();
        if (applicant.getExperience() != null) experience = applicant.getExperience();
        if (applicant.getNationality() != null) nationality = applicant.getNationality();
        if (applicant.getMajor() != null) major = applicant.getMajor();
        if (applicant.getBiography() != null) biography = applicant.getBiography();
        if (applicant.getAddress() != null) address = applicant.getAddress();
        if (applicant.getEducation() != null) education = applicant.getEducation();
        if (applicant.getWorkEmail() != null) workEmail = applicant.getWorkEmail();
        if (applicant.getPhoneNumber() != null) phoneNumber = applicant.getPhoneNumber();
        if (applicant.getFavoriteJobs() != null) {
            favoriteJobs = new ArrayList<>();

            for (Job job : applicant.getFavoriteJobs()) {
                JobDto dto = new JobDto();
                dto.update(job);

                favoriteJobs.add(dto);
            }
        }
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
