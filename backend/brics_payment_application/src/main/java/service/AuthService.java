package service;

import model.Cliente;
import repository.ClienteRepository;
import exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente autenticar(String email, String senha) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        if (new BCryptPasswordEncoder().matches(senha, cliente.getSenha())) {
            return cliente;
        }
        throw new RuntimeException("Senha inválida");
    }
}