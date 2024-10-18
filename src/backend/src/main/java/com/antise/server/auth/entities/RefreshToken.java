package com.server.cocoapp.auth.entities;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Document(collection = "Refresh Token")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
    @Id
    private String tokenId;

    @Indexed
    @NotBlank(message = "Please enter refresh token value!")
    @Size(max = 300)
    private String refreshToken;

    private Instant expirationTime;

    @DocumentReference(lazy = true)
    private User user;
}
