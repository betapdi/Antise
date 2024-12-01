package com.antise.server.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {
    public String uploadFile(String path, MultipartFile file) throws IOException {
        Date currentTime = new Date(System.currentTimeMillis());
        String fileName = String.valueOf(currentTime.getTime()) + "_" + file.getOriginalFilename();
        String filePath = path + File.separator + fileName;

        File newFile = new File(path);
        if (!newFile.exists()) {
            newFile.mkdirs();
        }

        Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }  
    
    public String deleteFile(String path, String fileName) throws IOException {
        String filePath = path + File.separator + fileName;
        Files.deleteIfExists(Paths.get(filePath));

        return "File deleted: " + fileName;
    }
    
    public InputStream getResoureFile(String path, String fileName) throws IOException {
        String filePath = path + File.separator + fileName;
        return new FileInputStream(filePath);
    }
}
