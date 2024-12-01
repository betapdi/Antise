package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.dto.JobDto;
import com.antise.server.services.JobService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/v1/job")
@AllArgsConstructor
public class JobController {
    private final JobService jobService;

    @GetMapping("/getAll")
    public ResponseEntity<List<JobDto>> getAllJobs(@RequestParam String param) {
        return ResponseEntity.ok(jobService.getAllJobs());
    }
 
    
}
