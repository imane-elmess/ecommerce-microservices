package ma.emsi.front_api.controller;

import ma.emsi.front_api.dto.LoginRequest;
import ma.emsi.front_api.security.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        // ✅ login simple (TP)
        if (req.getUsername() == null || req.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "username/password required"));
        }

        if (!"1234".equals(req.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "invalid credentials"));
        }

        String role = "USER";
        if ("admin".equalsIgnoreCase(req.getUsername())) role = "ADMIN";

        String token = jwtService.generateToken(req.getUsername(), role);

        return ResponseEntity.ok(Map.of(
                "token", token,
                "tokenType", "Bearer",
                "role", role
        ));
    }
}
