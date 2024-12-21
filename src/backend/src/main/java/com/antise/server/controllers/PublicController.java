package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.antise.server.controllers.requests.SearchJobRequest;
import com.antise.server.dto.CompanyDto;
import com.antise.server.dto.JobDto;
import com.antise.server.services.CompanyService;
import com.antise.server.services.JobService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("api/v1/public")
@AllArgsConstructor
public class PublicController {
    private final JobService jobService;
    private final CompanyService companyService;

    @GetMapping("/job/getAll")
    public ResponseEntity<List<JobDto>> getAllJobs() throws IOException {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @PostMapping("/job/search")
    public ResponseEntity<List<JobDto>> searchJob(@RequestPart("searchData") SearchJobRequest searchData) {
        List<JobDto> response = jobService.searchJob(searchData);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/company/getAll")
    public ResponseEntity<List<CompanyDto>> getAllCompanies() throws IOException {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }
    
}
