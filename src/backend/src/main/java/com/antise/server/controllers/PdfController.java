package com.antise.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.services.FileService;

import java.io.InputStream;

import java.io.IOException;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/pdf")
public class PdfController {
    private final FileService fileService;

    @Value("${project.pdf}")
    private String path;

    public PdfController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFileHandler(@RequestPart MultipartFile file) throws IOException {
        String uploadedFileName = fileService.uploadFile(path, file);
        return new ResponseEntity<>("File uploaded: " + uploadedFileName, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/{fileName}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> serveFileHandler(@PathVariable String fileName) throws IOException {
        InputStream resourceFile = fileService.getResoureFile(path, fileName);

        HttpHeaders headers = new HttpHeaders(); 
        headers.add("Content-Disposition", "inline; filename=" + fileName); 

        return ResponseEntity.ok() 
                .headers(headers) 
                .contentType(MediaType.APPLICATION_PDF) 
                .body(new InputStreamResource(resourceFile));
    }
}
