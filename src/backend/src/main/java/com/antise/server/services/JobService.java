package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.dto.JobDto;
import com.antise.server.entities.HumanResource;
import com.antise.server.entities.Job;
import com.antise.server.repositories.JobRepository;

import com.exceptions.UserRoleNotQualifiedException;
import com.exceptions.JobNotFoundException;
import com.exceptions.ObjectOwnershipException;
import com.exceptions.UserNotFoundException;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final FileService fileService;
    private final UserRepository userRepository;

    @Value("${project.static}")
    private String path;
    
    @Value("${base.url}")
    private String baseUrl;

    public JobService(JobRepository jobRepository, FileService fileService, UserRepository userRepository) {
        this.jobRepository = jobRepository;
        this.fileService = fileService;
        this.userRepository = userRepository;
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

    public JobDto createJob(JobDto jobDto, String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("User not found!"));
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.HR) throw new UserRoleNotQualifiedException("UserRole is not qualified!");

        Job job = new Job(); job.update(jobDto); job.setHrId(user.getUserId());
        jobRepository.save(job);

        JobDto response = new JobDto();
        response.update(job);

        return response;
    }

    public JobDto updateJob(JobDto jobDto, String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.HR) throw new UserRoleNotQualifiedException();
        
        Job job = jobRepository.findById(jobDto.getId()).orElseThrow(() -> new JobNotFoundException());
        if (user.getRole() == UserRole.HR && job.getHrId() != user.getUserId()) throw new ObjectOwnershipException();

        job.update(jobDto);

        Job updatedJob = jobRepository.save(job);

        JobDto response = new JobDto();
        response.update(updatedJob);

        return response;
    }

    public String deleteJob(String jobId, String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException());
        if (user.getRole() != UserRole.ADMIN && user.getRole() != UserRole.HR) throw new UserRoleNotQualifiedException();
        
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new JobNotFoundException());
        if (user.getRole() == UserRole.HR && job.getHrId() != user.getUserId()) throw new ObjectOwnershipException();

        HumanResource hr = (HumanResource)user;
        hr.getJobList().remove(job);
        userRepository.save(hr);

        jobRepository.delete(job);

        return "Job with id " + jobId + " is deleted successfully";
    }
}
