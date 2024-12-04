package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.ApplicationDto;
import com.antise.server.services.ApplicationService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/application")
@AllArgsConstructor
public class ApplicationController {
    
    private final ApplicationService applicationService;

    @GetMapping("/getAll")
    public ResponseEntity<List<ApplicationDto>> getAllApplications(@RequestParam String param) {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }
}
