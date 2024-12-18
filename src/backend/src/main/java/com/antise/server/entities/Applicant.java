package com.antise.server.entities;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.auth.entities.User;
import com.antise.server.dto.ApplicantDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Document(collection = "Users")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Applicant extends User {
    private Boolean gender;
    
    private String profileImageName;

    private String resumeName;

    private String fullName;
    
    @DBRef
    private List<Application> applications;

    private Date dateOfBirth;

    private String experience;

    private String education;

    private String nationality;

    private String major;

    private String biography;

    private String address;

    private String workEmail;

    private String phoneNumber;

    public void update(ApplicantDto dto) {
        if (dto.getGender() != null) gender = dto.getGender();
        if (dto.getFullName() != null) fullName = dto.getFullName();
        if (dto.getMajor() != null) major = dto.getMajor();
        if (dto.getDateOfBirth() != null) dateOfBirth = dto.getDateOfBirth();
        if (dto.getExperience() != null) experience = dto.getExperience();
        if (dto.getNationality() != null) nationality = dto.getNationality();
        if (dto.getMajor() != null) major = dto.getMajor();
        if (dto.getBiography() != null) biography = dto.getBiography();
        if (dto.getAddress() != null) address = dto.getAddress();
        if (dto.getEducation() != null) education = dto.getEducation();
        if (dto.getWorkEmail() != null) workEmail = dto.getWorkEmail();
        if (dto.getPhoneNumber() != null) phoneNumber = dto.getPhoneNumber();
    }

    public static Applicant fromUser(User user) {
        Applicant applicant = Applicant.builder() 
                .id(user.getId()).password(user.getPassword()).email(user.getEmail())
                .refreshToken(user.getRefreshToken()).role(user.getRole()).build(); 
        
        return applicant;
    }
}
