package com.antise.server.classes;
import java.sql.Date;
import java.time.LocalDate;
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
public class ApplicantNotification {
    private String companyName;

    private String jobId;

    private LocalDateTime createdAt;

    private Boolean status;
}
