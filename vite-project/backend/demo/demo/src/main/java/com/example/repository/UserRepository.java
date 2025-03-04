package com.example.repository;

import com.example.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepository {
    
    // In-memory user store (replace with actual database in production)
    private Map<String, User> users = new HashMap<>();
    
    public UserRepository() {
        // Add a default admin user for testing
        User admin = new User();
        admin.setEmail("admin@example.com");
        // Store the password in plain text for simplicity in this demo
        // In a real app, this would be stored as a hashed password
        admin.setPassword("password");
        admin.setRole("ADMIN");
        users.put(admin.getEmail(), admin);
    }
    
    public Optional<User> findByEmail(String email) {
        User user = users.get(email);
        return Optional.ofNullable(user);
    }
    
    public User save(User user) {
        users.put(user.getEmail(), user);
        return user;
    }

    public List<User> findAll() {
        return new ArrayList<>(users.values());
    }

    public boolean updateRole(String email, String newRole) {
        User user = users.get(email);
        if (user != null) {
            user.setRole(newRole);
            users.put(email, user);
            return true;
        }
        return false;
    }
}