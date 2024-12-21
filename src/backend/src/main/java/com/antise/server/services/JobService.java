package com.antise.server.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.controllers.requests.SearchJobRequest;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.ApplicationDto;
import com.antise.server.dto.JobDto;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Application;
import com.antise.server.entities.Company;
import com.antise.server.entities.Job;
import com.antise.server.exceptions.JobNotFoundException;
import com.antise.server.exceptions.ObjectOwnershipException;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.exceptions.UserRoleNotQualifiedException;
import com.antise.server.repositories.ApplicationRepository;
import com.antise.server.repositories.JobRepository;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final ApplicationService applicationService;

    public JobService(JobRepository jobRepository, UserRepository userRepository, 
                        ApplicationRepository applicationRepository, ApplicationService applicationService) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.applicationService = applicationService;
    }
    
    public List<JobDto> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        List<JobDto> jobDtos = new ArrayList<>();

        for (Job item : jobs) {
            JobDto dto = new JobDto();
            dto.update(item);
            jobDtos.add(dto);
        }

        return jobDtos;
    }

    public JobDto getJob(String jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobNotFoundException());
        
        JobDto response = new JobDto();
        response.update(job);

        return response;
    }

    public JobDto createJob(JobDto jobDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User not found!"));
        if (user.getRole() != UserRole.COMPANY) throw new UserRoleNotQualifiedException("UserRole is not qualified!");

        Job job = new Job(); job.update(jobDto); job.setCompanyId(user.getId());
        job.setPostedDate(Date.from((LocalDate.now()).atStartOfDay(ZoneId.systemDefault()).toInstant()));
        jobRepository.save(job);

        Company company = (Company)user;
        company.getJobList().add(job);
        userRepository.save(company);

        //Create job alert

        JobDto response = new JobDto();
        response.update(job);

        return response;
    }

    public JobDto updateJob(JobDto jobDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.COMPANY) throw new UserRoleNotQualifiedException();
        
        Job job = jobRepository.findById(jobDto.getId()).orElseThrow(() -> new JobNotFoundException());
        if (user.getRole() == UserRole.COMPANY && job.getCompanyId() != user.getId()) throw new ObjectOwnershipException();

        job.update(jobDto);
        Job updatedJob = jobRepository.save(job);

        JobDto response = new JobDto();
        response.update(updatedJob);

        return response;
    }

    public String deleteJob(String jobId, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.COMPANY) throw new UserRoleNotQualifiedException();
        
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobNotFoundException());
        if (user.getRole() == UserRole.COMPANY && job.getCompanyId() != user.getId()) throw new ObjectOwnershipException();

        Company company = (Company)user;
        company.getJobList().remove(job);
        userRepository.save(company);

        jobRepository.delete(job);

        return "Job with id " + jobId + " is deleted successfully";
    }

    public ApplicationDto applyJob(ApplicationDto applicationDto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() != UserRole.APPLICANT) throw new UserRoleNotQualifiedException();

        Application application = new Application();
        application.update(applicationDto);
        
        Application savedApplication = applicationRepository.save(application);

        Job job = jobRepository.findById(savedApplication.getJobId()).orElseThrow(() -> new JobNotFoundException());
        job.getApplications().add(savedApplication);
        jobRepository.save(job);

        Applicant applicant = (Applicant)user;
        applicant.getApplications().add(savedApplication);
        userRepository.save(applicant);

        ApplicationDto response = new ApplicationDto();
        response.update(savedApplication);

        //Notification

        return response;
    }

    public List<JobDto> searchJob(SearchJobRequest searchData) {
        List<Job> jobs = jobRepository.findAll();
        List<Job> filteredJobs = new ArrayList<>();
        // System.out.println("AAAAAAAAAAAAAAAAA");
        // System.out.println(searchData.getEducation());
        // System.out.println(searchData.getExperience());
        // System.out.println(searchData.getJobType());
        // System.out.println(searchData.getSearchPattern());
        // System.out.println(searchData.getMinSalary());
        // System.out.println(searchData.getMaxSalary());


        for(Job job : jobs) {
            if (searchData.getJobType() != null && job.getJobType() != searchData.getJobType()) continue;
            if (searchData.getEducation() != null && job.getEducation() != searchData.getEducation()) continue;
            if (searchData.getExperience() != null && job.getExperience() != searchData.getExperience()) continue;
            if (searchData.getSearchPattern() != null) {
                String jobTitle = (job.getTitle()).toLowerCase();
                String searchPattern = (searchData.getSearchPattern()).toLowerCase();

                if (!(jobTitle).contains(searchPattern)) continue;
            }

            if (searchData.getMaxSalary() != null && searchData.getMinSalary() != null) {
                System.out.println(searchData.getMaxSalary());
                System.out.println(searchData.getMinSalary());
                if (job.getMaxSalary() >= searchData.getMaxSalary()) {
                    if (job.getMinSalary() > searchData.getMaxSalary()) continue;
                }

                else if (searchData.getMinSalary() > job.getMaxSalary()) continue;
            }

            filteredJobs.add(job);
        }

        List<JobDto> response = new ArrayList<>();
        for (Job job : filteredJobs) {
            JobDto dto = new JobDto();
            dto.update(job);
            response.add(dto);
        }

        return response;
    }
}
