package com.antise.server.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.dto.CompanyDto;

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
public class Company {
    @Id
    private String id;

    private String location;

    private List<HumanResource> employees;

    public void update(CompanyDto companyDto) {
        if (companyDto.getId() != null) id = companyDto.getId();
        if (companyDto.getLocation() != null) location = companyDto.getLocation();
        if (companyDto.getEmployees() != null) employees = companyDto.getEmployees();
    }
}
