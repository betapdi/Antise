package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.controllers.responses.WebStatisticsResponse;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.JobDto;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Application;
import com.antise.server.entities.Company;
import com.antise.server.entities.Job;
import com.antise.server.exceptions.CompanyNotFoundException;
import com.antise.server.exceptions.JobNotFoundException;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.exceptions.UserRoleNotQualifiedException;
import com.antise.server.repositories.ApplicationRepository;
import com.antise.server.repositories.JobRepository;

@Service
public class AdminService {
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;

    private final UserService userService;

    public AdminService(UserRepository userRepository, ApplicationRepository applicationRepository, JobRepository jobRepository, UserService userService) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userService = userService;
    }

    public String verifyCompany(String companyId, String email) {
        User admin = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (admin.getRole() != UserRole.ADMIN) throw new UserRoleNotQualifiedException();

        User user = userRepository.findById(companyId).orElseThrow(() -> new CompanyNotFoundException());
        Company company = (Company)user;


        company.setVerified(true);
        userRepository.save(company);

        String response = "Company with id: " + companyId + "has been verified!";
        return response;
    }

    //delete user
    public String deleteUser(String userId, String email) {
        User admin = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (admin.getRole() != UserRole.ADMIN) throw new UserRoleNotQualifiedException();

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() == UserRole.ADMIN) throw new UserRoleNotQualifiedException();
        userRepository.deleteById(userId);

        String response = "User with id: " + userId + "has been deleted!";
        return response;
    }

    //admin data: num applications, pending companies, jobs, company types distribution, roles distribution
    public WebStatisticsResponse getWebStats(String email) {
        User admin = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (admin.getRole() != UserRole.ADMIN) throw new UserRoleNotQualifiedException();

        WebStatisticsResponse response = new WebStatisticsResponse();
        response.setApplications(Math.toIntExact(applicationRepository.count()));
        response.setJobs(Math.toIntExact(jobRepository.count()));
        response.setPendingCompanies(Math.toIntExact(userService.countPendingCompanies()));

        List<User> users = userRepository.findAll();
        int applicantCnt = 0, companyCnt = 0, adminCnt = 0;
        for (User user : users) {
            if (user.getRole() == UserRole.APPLICANT) ++applicantCnt;
            else if (user.getRole() == UserRole.COMPANY) ++companyCnt;
            else ++adminCnt;
        }

        response.getRoleCount().add(Pair.of("applicant", applicantCnt));
        response.getRoleCount().add(Pair.of("company", companyCnt));
        response.getRoleCount().add(Pair.of("admin", adminCnt));

        List<Company> companies = userRepository.findAllCompanies();
        int LLC = 0, corporation = 0, nonProfit = 0;
        for(Company company : companies) {
            if (company.getOrganizationType().equals("LLC")) ++LLC;
            else if (company.getOrganizationType().equals("Corporation")) ++corporation;
            else ++nonProfit;
        }

        response.getOrganizationTypeCount().add(Pair.of("LLC", LLC));
        response.getOrganizationTypeCount().add(Pair.of("Corporation", corporation));
        response.getOrganizationTypeCount().add(Pair.of("Non Profit", nonProfit));

        return response;
    }
}
