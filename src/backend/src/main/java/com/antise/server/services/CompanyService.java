package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.CompanyDto;
import com.antise.server.entities.Company;
import com.antise.server.repositories.CompanyRepository;

@Service
public class CompanyService {
    private final CompanyRepository companyRepository;
    private final FileService fileService;

    @Value("${project.static}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public CompanyService(CompanyRepository companyRepository, FileService fileService) {
        this.companyRepository = companyRepository;
        this.fileService = fileService;
    }

    public List<CompanyDto> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        List<CompanyDto> companyDtos = new ArrayList<>();

        for (Company item : companies) {
            CompanyDto dto = new CompanyDto();
            dto.update(item);
            companyDtos.add(dto);
        }

        return companyDtos;
    }
}
