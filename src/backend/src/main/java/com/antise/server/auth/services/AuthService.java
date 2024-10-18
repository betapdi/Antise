package com.server.cocoapp.auth.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.server.cocoapp.auth.entities.User;
import com.server.cocoapp.auth.entities.UserRole;
import com.server.cocoapp.auth.repositories.UserRepository;

import com.server.cocoapp.auth.utils.AuthResponse;
import com.server.cocoapp.auth.utils.LoginRequest;
import com.server.cocoapp.auth.utils.RegisterRequest;
import com.server.cocoapp.entities.Cart;
import com.server.cocoapp.entities.CartHistory;
import com.server.cocoapp.repositories.CartHistoryRepository;
import com.server.cocoapp.repositories.CartRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;

    private final CartRepository cartRepository;
    private final CartHistoryRepository cartHistoryRepository;
    
    public AuthResponse register(RegisterRequest registerRequest) {
        var user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .username(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(UserRole.USER)
                .build();

        user.setCart(new Cart());
        cartRepository.save(user.getCart());

        user.setCartHistory(new CartHistory());
        cartHistoryRepository.save(user.getCartHistory());
        
        // System.out.println(user);
        
        User savedUser = userRepository.save(user);
        savedUser.getCart().setUserId(user.getUserId());
        savedUser.getCartHistory().setUserId(user.getUserId());

        // System.out.println(savedUser);
        
        cartRepository.save(user.getCart());
        cartHistoryRepository.save(user.getCartHistory());

        // System.out.println(savedUser);

        var accessToken = jwtService.generateToken(savedUser);
        var refreshToken = refreshTokenService.createRefreshToken(savedUser.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }

    public AuthResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), 
                loginRequest.getPassword()
            )
        );

        var user = userRepository.findByEmail(loginRequest.getEmail()).
                orElseThrow(() -> new UsernameNotFoundException("User not found!"));
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }
}
