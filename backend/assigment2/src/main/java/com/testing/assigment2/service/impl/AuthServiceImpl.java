package com.testing.assigment2.service.impl;

import com.testing.assigment2.dto.request.LoginRequest;
import com.testing.assigment2.dto.response.LoginResponse;
import com.testing.assigment2.entity.User;
import com.testing.assigment2.exception.ResourceNotFoundException;
import com.testing.assigment2.repository.UserRepository;
import com.testing.assigment2.service.AuthService;
import com.testing.assigment2.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);


    @Override
    public LoginResponse authenticate(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + request.getUsername()));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.warn("Login failed for user: {}. Password mismatch.", request.getUsername());
            throw new BadCredentialsException("Invalid username or password.");
        }

        log.info("User {} logged in successfully.", request.getUsername());

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .uid(user.getId())
                .token(token)
                .username(user.getUsername())
                .build();
    }
}
