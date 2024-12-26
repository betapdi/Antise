package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.ApplicationDto;
import com.antise.server.entities.Application;
import com.antise.server.exceptions.ApplicationNotFoundException;
import com.antise.server.repositories.ApplicationRepository;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final FileService fileService;

    @Value("${base.url}")
    private String baseUrl;

    public ApplicationService(ApplicationRepository applicationRepository, FileService fileService) {
        this.applicationRepository = applicationRepository;
        this.fileService = fileService;
    }

    public List<ApplicationDto> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        List<ApplicationDto> applicationDtos = new ArrayList<>();

        for (Application item : applications) {
            ApplicationDto dto = new ApplicationDto();
            dto.update(item);
            applicationDtos.add(dto);
        }

        return applicationDtos;
    }

    public ApplicationDto getApplication(String applicationId) {
        Application application = applicationRepository.findById(applicationId).orElseThrow(() -> new ApplicationNotFoundException());

        ApplicationDto response = new ApplicationDto();
        response.update(application);

        return response;
    }
}
