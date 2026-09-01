package controller;

import dto.LoginRequestDTO;
import model.Cliente;
import service.AuthService;
import config.JwtTokenProvider;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        Cliente cliente = authService.autenticar(request.getEmail(), request.getSenha());
        String token = tokenProvider.generateToken(cliente.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("clienteId", cliente.getId());
        response.put("email", cliente.getEmail());
        response.put("nome", cliente.getNome());
        return ResponseEntity.ok(response);
    }
}