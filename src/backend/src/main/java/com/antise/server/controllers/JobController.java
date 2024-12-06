package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.antise.server.dto.JobDto;
import com.antise.server.services.JobService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/job")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping("/getAll")
    public ResponseEntity<List<JobDto>> getAllJobs() throws IOException {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/get/{jobId}")
    public ResponseEntity<JobDto> getJob(@PathVariable("jobId") String jobId) throws IOException {
        JobDto response = jobService.getJob(jobId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
 
    @PostMapping("/create")
    public ResponseEntity<JobDto> createJob(@RequestPart("job") JobDto jobDto, @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        JobDto response = jobService.createJob(jobDto, userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<JobDto> updateJob(@RequestPart("job") JobDto jobDto, @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        JobDto response = jobService.updateJob(jobDto, userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable("jobId") String jobId, @AuthenticationPrincipal UserDetails userDetails) throws IOException {
        String response = jobService.deleteJob(jobId, userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
