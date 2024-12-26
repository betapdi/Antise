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
import com.antise.server.dto.CompanyDto;
import com.antise.server.services.CompanyService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("api/v1/company")
public class CompanyController {
    
    private final CompanyService companyService;
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

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
    public ResponseEntity<CompanyDto> createCompany(@AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        CompanyDto response = companyService.createCompany(userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<CompanyDto> updateCompany(@RequestPart("company") CompanyDto company, 
                                                    @RequestPart(value = "banner", required = false) MultipartFile bannerFile,
                                                    @RequestPart(value = "logo", required = false) MultipartFile logoFile,
                                                    @AuthenticationPrincipal UserDetails userDetails) throws IOException {        
        CompanyDto response = companyService.updateCompany(company, bannerFile, logoFile, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/saveApplication")
    public ResponseEntity<CompanyDto> saveApplication(@RequestPart("applicationId") String applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        CompanyDto response = companyService.saveApplication(applicationId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/removeSavedApplication")
    public ResponseEntity<String> removeSavedApplication(@RequestPart("applicationId") String applicationId, @AuthenticationPrincipal UserDetails userDetails) {
        String response = companyService.removeSavedApplication(applicationId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @PostMapping("/search/{searchPattern}")
    public ResponseEntity<List<CompanyDto>> searchCompany(@PathVariable("searchPattern") String searchPattern) {
        List<CompanyDto> response = companyService.searchCompany(searchPattern);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
}
