package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.dto.CompanyDto;
import com.antise.server.entities.Company;
import com.antise.server.exceptions.CompanyNotFoundException;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.exceptions.UserRoleNotQualifiedException;

@Service
public class CompanyService {
    private final UserRepository userRepository;
    private final FileService fileService;

    @Value("${project.static}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public CompanyService(FileService fileService, UserRepository userRepository) {
        this.fileService = fileService;
        this.userRepository = userRepository;
    }

    public List<CompanyDto> getAllCompanies() {
        List<User> users = userRepository.findAll();
        List<Company> companies = users.stream().filter(user -> user instanceof Company).
                                    map(user -> (Company)user).collect(Collectors.toList());
        List<CompanyDto> companyDtos = new ArrayList<>();

        for (Company item : companies) {
            CompanyDto dto = new CompanyDto();
            dto.update(item);
            companyDtos.add(dto);
        }

        return companyDtos;
    }

    public CompanyDto getCompany(String companyId) {
        User user = userRepository.findById(companyId).orElseThrow(() -> new CompanyNotFoundException());
        Company company = (Company)user;
        
        CompanyDto response = new CompanyDto();
        response.update(company);

        return response;
    }

    public CompanyDto createCompany(CompanyDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());

        Company company = Company.fromUser(user, dto);
        company.update(dto);
        company.setRole(UserRole.COMPANY);
        Company savedCompany = userRepository.save(company);

        CompanyDto response = new CompanyDto();
        response.update(savedCompany);

        return response;
    }
}
