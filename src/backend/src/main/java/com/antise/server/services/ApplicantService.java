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
import com.antise.server.dto.ApplicantDto;
import com.antise.server.entities.Applicant;
import com.antise.server.exceptions.CompanyNotFoundException;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.exceptions.UserRoleNotQualifiedException;

@Service
public class ApplicantService {
    private final UserRepository userRepository;
    private final FileService fileService;

    @Value("${project.pdf}")
    private String pathResume;

    @Value("${project.image}")
    private String pathImage;

    @Value("${base.url}")
    private String baseUrl;

    public ApplicantService(FileService fileService, UserRepository userRepository) {
        this.fileService = fileService;
        this.userRepository = userRepository;
    }

    public List<ApplicantDto> getAllApplicants() {
        List<User> users = userRepository.findAll();
        List<Applicant> applicants = users.stream().filter(user -> user instanceof Applicant).
                                    map(user -> (Applicant)user).collect(Collectors.toList());
        List<ApplicantDto> applicantDtos = new ArrayList<>();

        for (Applicant item : applicants) {
            ApplicantDto dto = new ApplicantDto();
            dto.update(item);
            applicantDtos.add(dto);
        }

        return applicantDtos;
    }

    public ApplicantDto getApplicant(String applicantId) {
        User user = userRepository.findById(applicantId).orElseThrow(() -> new CompanyNotFoundException());
        Applicant applicant = (Applicant)user;
        
        ApplicantDto response = new ApplicantDto();
        response.update(applicant);

        return response;
    }

    public ApplicantDto createApplicant(ApplicantDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());

        Applicant applicant = Applicant.fromUser(user, dto);
        applicant.update(dto);
        applicant.setRole(UserRole.APPLICANT);
        Applicant savedApplicant = userRepository.save(applicant);

        ApplicantDto response = new ApplicantDto();
        response.update(savedApplicant);

        return response;
    }

    public ApplicantDto updateApplicant(ApplicantDto dto, MultipartFile profileImage, MultipartFile resume, String email) throws IOException {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        
        Applicant applicant = (Applicant)user;
        applicant.update(dto);

        if (profileImage != null) {
            String fileName = fileService.uploadFile(pathImage, profileImage);
            applicant.setProfileImageName(fileName);
        }

        if (resume != null) {
            String fileName = fileService.uploadFile(pathResume, resume);
            applicant.setResume(fileName);
        }
        
        Applicant savedApplicant = userRepository.save(applicant);
        ApplicantDto response = new ApplicantDto();
        response.update(savedApplicant);

        return response;
    }
}
