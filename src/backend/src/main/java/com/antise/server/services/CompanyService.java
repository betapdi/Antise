package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.classes.CompanyNotification;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.CompanyDto;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Application;
import com.antise.server.entities.Company;
import com.antise.server.exceptions.ApplicantNotFoundException;
import com.antise.server.exceptions.ApplicationNotFoundException;
import com.antise.server.exceptions.CompanyNotFoundException;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.repositories.ApplicationRepository;

@Service
public class CompanyService {
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final FileService fileService;

    @Value("${project.image}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    public CompanyService(FileService fileService, UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.fileService = fileService;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
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

    public CompanyDto createCompany(String email) throws IOException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());

        Company company = Company.fromUser(user);
        company.setRole(UserRole.COMPANY);
        
        Company savedCompany = userRepository.save(company);
        CompanyDto response = new CompanyDto();
        response.update(savedCompany);

        return response;
    }

    public CompanyDto updateCompany(CompanyDto dto, MultipartFile bannerFile, MultipartFile logoFile, String email) throws IOException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        
        Company company = (Company)user;
        company.update(dto);

        if (bannerFile != null) {
            String bannerName = fileService.uploadFile(path, bannerFile);
            company.setBannerName(bannerName);
        }

        if (logoFile != null) {
            String logoName = fileService.uploadFile(path, logoFile);
            company.setLogoName(logoName);
        }
        
        Company savedCompany = userRepository.save(company);
        CompanyDto response = new CompanyDto();
        response.update(savedCompany);

        return response;
    }

    public CompanyDto saveApplication(String applicationId, String email) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new ApplicationNotFoundException());
        Company company = (Company)(userRepository.findByEmail(email).orElseThrow(() -> new CompanyNotFoundException()));

        Boolean ok = true;
        for (Application savedApplication : company.getSavedApplications()) {
            if (savedApplication.getId().equals(applicationId)) {
                ok = false; 
                break;
            }
        }

        if (ok) company.getSavedApplications().add(application);
        Company savedCompany = userRepository.save(company);

        CompanyDto response = new CompanyDto();
        response.update(savedCompany);
        return response;
    }

    public String removeSavedApplication(String applicationId, String email) {
        Company company = (Company)(userRepository.findByEmail(email).orElseThrow(() -> new CompanyNotFoundException()));

        Application chosen = null;
        for (Application application : company.getSavedApplications()) {
            if (application.getId().equals(applicationId)) {
                chosen = application;
            }
        }

        if (chosen != null) {
            company.getSavedApplications().remove(chosen);
            userRepository.save(company);
        }

        String response = "Application with id: " + applicationId + " has been removed from savedApplications successfully!";
        return response;
    }

    public List<CompanyDto> searchCompany(String searchPattern) {
        List<User> users = userRepository.findAll();
        List<Company> companies = users.stream().filter(user -> user instanceof Company).
                                    map(user -> (Company)user).collect(Collectors.toList());

        List<CompanyDto> response = new ArrayList<>();
        for (Company company : companies) {
            if (company.getVerified().equals(false)) continue;
            if (company.getName() == null) continue;
            String companyName = (company.getName()).toLowerCase();
            String searchPatternLowercase = searchPattern.toLowerCase();

            if (searchPattern == null || searchPattern.equals("null") || companyName.contains(searchPatternLowercase)) {
                CompanyDto dto = new CompanyDto();
                dto.update(company);
                response.add(dto);
            }
        }

        return response;
    }

    public CompanyNotification readNotification(String applicationId, String email) {
        Company company = (Company)userRepository.findByEmail(email).orElseThrow(() -> new CompanyNotFoundException());
        
        CompanyNotification response = null;
        for (CompanyNotification notification : company.getNotifications()) {
            if (notification.getApplicationId().equals(applicationId)) {
                notification.setStatus(true);
                response = notification;
            }
        }

        userRepository.save(company);
        return response;
    }
}
