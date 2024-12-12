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

    private String resume;
    
    @DBRef
    private List<Application> applications;

    private Date dateOfBirth;

    private Integer experience;

    private String nationality;

    private String major;

    private String biography;

    public void update(ApplicantDto dto) {
        if (dto.getGender() != null) gender = dto.getGender();
        if (dto.getDateOfBirth() != null) dateOfBirth = dto.getDateOfBirth();
        if (dto.getExperience() != null) experience = dto.getExperience();
        if (dto.getNationality() != null) nationality = dto.getNationality();
        if (dto.getMajor() != null) major = dto.getMajor();
        if (dto.getBiography() != null) biography = dto.getBiography();
    }

    public static Applicant fromUser(User user) {
        Applicant applicant = Applicant.builder() 
                .id(user.getId()).password(user.getPassword()).email(user.getEmail())
                .phoneNumber(user.getPhoneNumber()).refreshToken(user.getRefreshToken())
                .fullName(user.getFullName()).role(user.getRole()).build(); 
        
        return applicant;
    }
}
