package service;

import model.Cliente;
import repository.ClienteRepository;
import exception.EntityNotFoundException;
import exception.BusinessException; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;   // ← Usa o bean do SecurityConfig

    public Cliente autenticar(String email, String senha) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        if (!passwordEncoder.matches(senha, cliente.getSenha())) {
            // ← BusinessException retorna 400, RuntimeException retornaria 500
            throw new BusinessException("E-mail ou senha inválidos");
        }
        return cliente;
    }
}