package com.example.service;

import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public String login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Simple password check for this demo
            if (password.equals(user.getPassword())) {
                return jwtUtil.generateToken(email);
            }
        }
        return null;
    }

    public User register(User user) {
        // Check if user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null;
        }
        
        // Make sure it has a default role
        if (user.getRole() == null) {
            user.setRole("RESEARCHER"); // Default role
        }
        
        return userRepository.save(user);
    }

    public boolean updateUserRole(String email, String role) {
        return userRepository.updateRole(email, role);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}