package com.antise.server.controllers.responses;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.util.Pair;

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
public class WebStatisticsResponse {
    private Integer applications;
    private Integer pendingCompanies;
    private Integer jobs;

    @Builder.Default
    private List<Pair<String, Integer>> roleCount = new ArrayList<>();

    @Builder.Default
    private List<Pair<String, Integer>> organizationTypeCount = new ArrayList<>();
}
