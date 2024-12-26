package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.classes.ApplicantNotification;
import com.antise.server.classes.CompanyNotification;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.JobDto;
import com.antise.server.services.ApplicantService;
import com.antise.server.services.JobService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("api/v1/applicant")
public class ApplicantController {
    
    private final ApplicantService applicantService;

    public ApplicantController(ApplicantService applicantService) {
        this.applicantService = applicantService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<ApplicantDto>> getAllApplicants() throws IOException {
        return ResponseEntity.ok(applicantService.getAllApplicants());
    }

    @GetMapping("/get/{applicantId}")
    public ResponseEntity<ApplicantDto> getApplicant(@PathVariable("applicantId") String applicantId) {
        ApplicantDto response = applicantService.getApplicant(applicantId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApplicantDto> createApplicant(@AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        ApplicantDto response = applicantService.createApplicant(userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<ApplicantDto> updateApplicant(@RequestPart("applicant") ApplicantDto applicant,
                                                        @RequestPart(value = "profileImage", required = false) MultipartFile profileImage,
                                                        @RequestPart(value = "resume", required = false) MultipartFile resume,
                                                        @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        ApplicantDto response = applicantService.updateApplicant(applicant, profileImage, resume, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addFavoriteJob/{jobId}")
    public ResponseEntity<JobDto> addFavoriteJob(@PathVariable("jobId") String jobId, @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        JobDto response = applicantService.addFavoriteJob(jobId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/removeFavoriteJob/{jobId}")
    public ResponseEntity<String> removeFavoriteJob(@PathVariable("jobId") String jobId, @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        String response = applicantService.removeFavoriteJob(jobId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getAppliedJobs")
    public ResponseEntity<List<JobDto>> getAppliedJobs(@AuthenticationPrincipal UserDetails userDetails) {
        List<JobDto> response = applicantService.getAppliedJobs(userDetails.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/readNotification/{jobId}")
    public ResponseEntity<ApplicantNotification> readNotification(@PathVariable("jobId") String jobId, @AuthenticationPrincipal UserDetails userDetails) {
        ApplicantNotification response = applicantService.readNotification(jobId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
