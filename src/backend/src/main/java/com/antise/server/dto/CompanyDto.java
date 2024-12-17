package com.antise.server.dto;

import com.antise.server.auth.entities.User;
import com.antise.server.entities.Company;
import com.antise.server.entities.Job;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyDto extends UserDto {
    private String name;

    private String logoUrl;

    private String bannerUrl;

    private String description;

    private String benefit;

    private String location;

    private String organizationType;

    private String companyUrl;

    private Date yearOfEstablishment;

    private String companyEmail;

    private String companyPhoneNumber;

    private List<JobDto> jobList;

    private Boolean verified;

    public void update(Company company) {
        // System.out.println(company.getRefreshToken());
        this.update((User)company);
        if (company.getName() != null) name = company.getName();
        if (company.getLogoName() != null) logoUrl = "/image/" + company.getLogoName();
        if (company.getBannerName() != null) bannerUrl = "/image/" + company.getBannerName();
        if (company.getDescription() != null) description = company.getDescription();
        if (company.getBenefit() != null) benefit = company.getBenefit();
        if (company.getLocation() != null) location = company.getLocation();
        if (company.getOrganizationType() != null) organizationType = company.getOrganizationType();
        if (company.getCompanyUrl() != null) companyUrl = company.getCompanyUrl();
        if (company.getVerified() != null) verified = company.getVerified();
        if (company.getYearOfEstablishment() != null) yearOfEstablishment = company.getYearOfEstablishment();
        if (company.getCompanyEmail() != null) companyEmail = company.getCompanyEmail();
        if (company.getCompanyPhoneNumber() != null) companyPhoneNumber = company.getCompanyPhoneNumber();
        
        if (company.getJobList() != null) {
            jobList = new ArrayList<>();

            for (Job job : company.getJobList()) {
                JobDto dto = new JobDto();
                dto.update(job);

                jobList.add(dto);
            }
        }
    }
}
