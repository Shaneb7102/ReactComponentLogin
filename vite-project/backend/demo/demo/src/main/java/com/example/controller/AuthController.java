package com.example.controller;

import java.util.Collections;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

import com.example.model.User;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") //Allows requests from react

public class AuthController {

    @PostMapping("/login")
    public ResponseEntity <?> login(@RequestBody User user){
        if("admin@example.com".equals(user.getEmail()) && "password".equals(user.getPassword())){
            String token = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, "my-secret-key")
                .compact();
            
            return ResponseEntity.ok(Collections.singletonMap("token",token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}