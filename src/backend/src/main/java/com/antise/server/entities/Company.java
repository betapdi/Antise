package com.antise.server.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.auth.entities.User;
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

    @Builder.Default
    private Boolean verified = false;

    @DBRef
    @Builder.Default
    private List<Job> jobList = new ArrayList<>();

    public void update(CompanyDto dto) {
        if (dto.getName() != null) name = dto.getName();
        if (dto.getDescription() != null) description = dto.getDescription();
        if (dto.getBenefit() != null) benefit = dto.getBenefit();
        if (dto.getLocation() != null) location = dto.getLocation();
        if (dto.getOrganizationType() != null) organizationType = dto.getOrganizationType();
        if (dto.getCompanyUrl() != null) companyUrl = dto.getCompanyUrl();
    }

    public static Company fromUser(User user, CompanyDto dto) { 
        System.out.println(user.getRefreshToken());
        Company company = Company.builder() 
                .id(user.getId()).password(user.getPassword()).username(user.getUsername())
                .email(user.getEmail()).phoneNumber(user.getPhoneNumber()).imageName(user.getImageName())
                .role(user.getRole()).refreshToken(user.getRefreshToken()).build(); 
        
        company.update(dto);
        System.out.println(company);
        return company;
    }
}
