package com.antise.server.dto;

import com.antise.server.entities.Company;
import com.antise.server.entities.HumanResource;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CompanyDto {
    private String id;

    private String location;

    private List<HumanResource> employees;

    public void update(Company company) {
        if (company.getId() != null) id = company.getId();
        if (company.getLocation() != null) location = company.getLocation();
        if (company.getEmployees() != null) employees = company.getEmployees();
    }
}
