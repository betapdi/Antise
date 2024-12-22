package com.antise.server.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.auth.entities.User;
import com.antise.server.classes.CompanyNotification;
import com.antise.server.dto.CompanyDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
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
public class Company extends User {
    private String name;

    private String logoName;

    private String bannerName;

    private String description;

    private String benefit;

    private String location;

    private String organizationType;

    private String companyUrl;

    private Date yearOfEstablishment;

    private String companyEmail;

    private String companyPhoneNumber;

    private String size;

    private String industry;

    @Builder.Default
    private Boolean verified = false;

    @Builder.Default
    private List<CompanyNotification> notifications = new ArrayList<>();

    @DBRef
    @Builder.Default
    private List<Job> jobList = new ArrayList<>();

    @DBRef
    @Builder.Default
    private List<Applicant> savedApplicants = new ArrayList<>();

    @Builder.Default
    private List<String> notifiedApplicantIds = new ArrayList<>();

    public void update(CompanyDto dto) {
        if (dto.getName() != null) name = dto.getName();
        if (dto.getDescription() != null) description = dto.getDescription();
        if (dto.getBenefit() != null) benefit = dto.getBenefit();
        if (dto.getLocation() != null) location = dto.getLocation();
        if (dto.getOrganizationType() != null) organizationType = dto.getOrganizationType();
        if (dto.getCompanyUrl() != null) companyUrl = dto.getCompanyUrl();
        if (dto.getYearOfEstablishment() != null) yearOfEstablishment = dto.getYearOfEstablishment();
        if (dto.getCompanyEmail() != null) companyEmail = dto.getCompanyEmail();
        if (dto.getCompanyPhoneNumber() != null) companyPhoneNumber = dto.getCompanyPhoneNumber();
        if (dto.getSize() != null) size = dto.getSize();
        if (dto.getIndustry() != null) industry = dto.getIndustry();
    }

    public static Company fromUser(User user) { 
        Company company = Company.builder() 
                        .id(user.getId()).password(user.getPassword()).email(user.getEmail())
                        .refreshToken(user.getRefreshToken()).role(user.getRole()).build(); 
                        
        return company;
    }
}
