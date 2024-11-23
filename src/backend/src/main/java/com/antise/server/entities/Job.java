package com.antise.server.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.antise.server.classes.Contact;
import com.antise.server.classes.JobStatus;
import com.antise.server.classes.SocialMedia;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@Document
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Job {
    @Id
    private String id;

    private String description;

    private String benefits;

    private String companyVision;

    private String address;

    private Long postDate;

    private JobStatus status;

    private Contact contactInformation;

    private List<SocialMedia> socialMedias; 
}
