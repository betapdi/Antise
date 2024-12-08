package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.services.AuthService;
import com.antise.server.auth.services.JwtService;
import com.antise.server.auth.services.RefreshTokenService;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.services.ApplicantService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;



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
    public ResponseEntity<ApplicantDto> createApplicant(@RequestPart("applicant") ApplicantDto applicant, @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        ApplicantDto response = applicantService.createApplicant(applicant, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<ApplicantDto> updateApplicant(@RequestPart("applicant") ApplicantDto applicant,
                                                        @RequestPart("profileImage") MultipartFile profileImage,
                                                        @RequestPart("resume") MultipartFile resume,
                                                        @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        ApplicantDto response = applicantService.updateApplicant(applicant, profileImage, resume, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
