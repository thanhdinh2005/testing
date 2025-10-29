package com.testing.assigment2.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class LoginResponse {
    private Long uid;
    private String username;
    private String token;
}
