package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.controllers.responses.WebStatisticsResponse;
import com.antise.server.services.AdminService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    private final AdminService adminService;
    
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/verifyCompany/{companyId}")
    public ResponseEntity<String> verifyCompany(@PathVariable("companyId") String companyId, @AuthenticationPrincipal UserDetails userDetails) {
        String response = adminService.verifyCompany(companyId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") String userId, @AuthenticationPrincipal UserDetails userDetails) {
        String response = adminService.deleteUser(userId, userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getWebStats")
    public ResponseEntity<WebStatisticsResponse> getWebStats(@AuthenticationPrincipal UserDetails userDetails) {
        WebStatisticsResponse response = adminService.getWebStats(userDetails.getUsername());
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
