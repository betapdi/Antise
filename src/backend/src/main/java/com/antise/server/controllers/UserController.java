package com.antise.server.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.auth.entities.User;
import com.antise.server.dto.ApplicantDto;
import com.antise.server.dto.CompanyDto;
import com.antise.server.dto.UserDto;
import com.antise.server.entities.Applicant;
import com.antise.server.entities.Company;
import com.antise.server.services.UserService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UserController {
        private final UserService userService;
    
        @GetMapping("/get")
        public ResponseEntity<Object> getUserData(@AuthenticationPrincipal UserDetails userDetails) {
            Object user = userService.getUserData(userDetails.getUsername());

           return new ResponseEntity<>(user, HttpStatus.OK);
        }
}
