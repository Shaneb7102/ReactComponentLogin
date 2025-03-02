@RestController
@RequesMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") //Allows requests from react

public class AuthController {

    @PostMapping("/login")
    public ResponseEntity <?> login(@RequestBody User user){
        if("admin".equals(user.getEmail()) && "password".equals(user.getPassword()) && "admin".equals(user.getRole())){
            String token = Jwts.builder()
                .setSubject(user.getUsername())
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