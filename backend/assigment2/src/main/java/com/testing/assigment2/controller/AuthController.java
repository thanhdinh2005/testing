package com.testing.assigment2.controller;

import com.testing.assigment2.dto.request.LoginRequest;
import com.testing.assigment2.dto.response.ApiResponse;
import com.testing.assigment2.dto.response.LoginResponse;
import com.testing.assigment2.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(ApiResponse.success(authService.authenticate(request)));
    }
}
