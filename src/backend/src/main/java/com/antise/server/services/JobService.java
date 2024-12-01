package com.antise.server.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.JobDto;
import com.antise.server.entities.Job;
import com.antise.server.repositories.JobRepository;

@Service
public class JobService {
    private final JobRepository jobRepository;
    private final FileService fileService;

    @Value("${project.static}")
    private String path;
    
    @Value("${base.url}")
    private String baseUrl;

    public JobService(JobRepository jobRepository, FileService fileService) {
        this.jobRepository = jobRepository;
        this.fileService = fileService;
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
}
