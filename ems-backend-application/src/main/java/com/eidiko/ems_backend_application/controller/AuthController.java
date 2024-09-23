package com.eidiko.ems_backend_application.controller;

import com.eidiko.ems_backend_application.dto.JwtResponse;
import com.eidiko.ems_backend_application.dto.LoginRequest;
import com.eidiko.ems_backend_application.dto.RegisterRequest;
import com.eidiko.ems_backend_application.security.JwtGenerator;
import com.eidiko.ems_backend_application.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    UserDetailsService userDetailsService;
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtGenerator jwtGenerator;

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody RegisterRequest registerRequest) {
        employeeService.registerEmployee(registerRequest);
        return ResponseEntity.ok("Employee registered successfully!");
    }


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }
}
