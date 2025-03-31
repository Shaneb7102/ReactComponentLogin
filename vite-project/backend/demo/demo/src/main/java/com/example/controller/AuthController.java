package com.example.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allows requests from react
public class AuthController {

    private final UserRepository userRepository;
    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String token = authService.login(user.getEmail(), user.getPassword());
        
        if (token != null) {
            User foundUser = userRepository.findByEmail(user.getEmail()).orElse(null);
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", user.getEmail());
            
            if (foundUser != null) {
                response.put("role", foundUser.getRole());
            }
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User registeredUser = authService.register(user);
        
        if (registeredUser != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("email", registeredUser.getEmail());
            response.put("role", registeredUser.getRole());
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
        }
    }

    @PostMapping("/users/role")
    public ResponseEntity<?> updateUserRole(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String role = request.get("role");
        
        if (email == null || role == null) {
            return ResponseEntity.badRequest().body("Email and role are required");
        }
        
        boolean success = userRepository.updateRole(email, role);
        
        if (success) {
            return ResponseEntity.ok(Map.of("message", "Role updated successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> userList = userRepository.findAll();
        
        // Remove password from response for security
        List<Map<String, Object>> userDTOs = userList.stream()
            .map(user -> {
                Map<String, Object> dto = new HashMap<>();
                dto.put("email", user.getEmail());
                dto.put("role", user.getRole());
                return dto;
            })
            .collect(Collectors.toList());
        
        return ResponseEntity.ok(userDTOs);
    }
}