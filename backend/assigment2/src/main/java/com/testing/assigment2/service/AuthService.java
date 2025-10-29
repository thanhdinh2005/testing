package com.testing.assigment2.service;

import com.testing.assigment2.dto.request.LoginRequest;
import com.testing.assigment2.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse authenticate(LoginRequest request);
}
