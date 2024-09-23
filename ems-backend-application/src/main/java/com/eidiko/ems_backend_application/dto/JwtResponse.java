package com.eidiko.ems_backend_application.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtResponse {
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }
}
