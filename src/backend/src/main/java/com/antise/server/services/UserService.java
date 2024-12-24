package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.CompanyDto;
import com.antise.server.dto.UserDto;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Company;
import com.antise.server.exceptions.UserNotFoundException;

@Service
public class UserService {
    @Autowired 
    private MongoTemplate mongoTemplate;

    private final UserRepository userRepository;
    private final FileService fileService;

    public UserService(UserRepository userRepository, FileService fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    public long countPendingCompanies() {
        Query query = new Query();
        query.addCriteria(Criteria.where("_class").is("com.antise.server.entities.Company"));
        query.addCriteria(Criteria.where("verified").is(false));
        
        return mongoTemplate.count(query, User.class);
    }

    public List<Object> getAllUsers(String email) {
        List<User> users = userRepository.findAll();

        List<Object> response = new ArrayList<>();
        for (User user : users) {
            if (user instanceof Company) {
                Company company = (Company)user;
                CompanyDto dto = new CompanyDto();
                dto.update(company);
    
                response.add(dto);
            }
    
            else if (user instanceof Applicant) {
                Applicant applicant = (Applicant)user;
                ApplicantDto dto = new ApplicantDto();
                dto.update(applicant);
    
                response.add(dto);
            }
        }
    
        return response;
    }

    public Object getUserData(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        
        if (user instanceof Company) {
            Company company = (Company)user;
            CompanyDto dto = new CompanyDto();
            dto.update(company);

            return dto;
        }

        else if (user instanceof Applicant) {
            Applicant applicant = (Applicant)user;
            ApplicantDto dto = new ApplicantDto();
            dto.update(applicant);

            return dto;
        }

        UserDto dto = new UserDto();
        dto.update(user);
        return dto;
    }
}
