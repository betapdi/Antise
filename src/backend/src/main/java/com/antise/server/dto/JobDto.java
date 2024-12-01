package com.antise.server.dto;

import java.util.List;

import com.antise.server.classes.Contact;
import com.antise.server.classes.JobStatus;
import com.antise.server.classes.SocialMedia;
import com.antise.server.entities.Job;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobDto {
    private String id;

    private String description;

    private String benefits;

    private String companyVision;

    private String address;

    private Long postDate;

    private JobStatus status;

    private Contact contactInformation;

    private List<SocialMedia> socialMedias;

    public void update(Job job) {
        if (job.getId() != null) id = job.getId();
        if (job.getAddress() != null) address = job.getAddress();
        
    }
}
