package com.antise.server.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SearchJobRequest {
    private String experience;

    private Integer minSalary;

    private Integer maxSalary;

    private String jobType;

    private String education;

    private String searchPattern;
}
