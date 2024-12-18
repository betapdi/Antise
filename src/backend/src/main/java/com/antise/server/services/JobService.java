package com.antise.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
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
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.COMPANY) throw new UserRoleNotQualifiedException("UserRole is not qualified!");

        Job job = new Job(); job.update(jobDto); job.setCompanyId(user.getId());
        jobRepository.save(job);

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

        return response;
    }
}
