package com.antise.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.antise.server.services.FileService;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/v1/pdf")
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

    @GetMapping("/{fileName}/details")
    public ResponseEntity<Map<String, Object>> getFileDetails(@PathVariable String fileName) throws IOException {
        try {
            Path filePath = Paths.get(path, fileName);

            Map<String, Object> fileDetails = new HashMap<>(); 
            fileDetails.put("lastModified", Files.getLastModifiedTime(filePath).toMillis()); 
            fileDetails.put("lastModifiedDate", Files.getLastModifiedTime(filePath).toString()); 
            fileDetails.put("name", fileName); fileDetails.put("size", Files.size(filePath)); 
            fileDetails.put("type", Files.probeContentType(filePath)); 
            return new ResponseEntity<>(fileDetails, HttpStatus.OK); 

        } catch (IOException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("Error", "Failed to fetch file details: " + e.getMessage()); 
            return new ResponseEntity(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
}
