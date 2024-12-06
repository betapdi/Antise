package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.CompanyDto;
import com.antise.server.services.CompanyService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1/company")
@AllArgsConstructor
public class CompanyController {
    
    private final CompanyService companyService;

    @GetMapping("/getAll")
    public ResponseEntity<List<CompanyDto>> getAllCompanies() throws IOException {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/get/{companyId}")
    public ResponseEntity<CompanyDto> getCompany(@PathVariable("companyId") String companyId) {
        CompanyDto response = companyService.getCompany(companyId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<CompanyDto> createCompany(@RequestPart("company") CompanyDto company, @AuthenticationPrincipal UserDetails userDetails) {
        CompanyDto response = companyService.createCompany(company, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
