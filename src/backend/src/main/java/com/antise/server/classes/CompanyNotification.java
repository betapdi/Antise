package com.antise.server.classes;
import java.time.LocalDateTime;

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
public class CompanyNotification {
    private String applicantName;

    private String applicationId;

    private LocalDateTime createdAt;

    private Boolean status;
}
