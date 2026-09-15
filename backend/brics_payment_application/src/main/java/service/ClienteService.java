package service;

import dto.ClienteDTO;
import model.Cliente;
import model.Conta;
import model.TipoConta;
import repository.ClienteRepository;
import repository.ContaRepository;
import exception.BusinessException;
import exception.EntityNotFoundException;         
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ClienteService {

    @Autowired private ClienteRepository clienteRepository;
    @Autowired private ContaRepository contaRepository;
    @Autowired private PasswordEncoder passwordEncoder;   

    @Transactional
    public Cliente cadastrar(ClienteDTO dto) {
        if (clienteRepository.existsByCpf(dto.getCpf())) {
            throw new BusinessException("CPF já cadastrado");
        }
        if (clienteRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("E-mail já cadastrado");
        }

        Cliente cliente = new Cliente();
        cliente.setCpf(dto.getCpf());
        cliente.setNome(dto.getNome());
        cliente.setDataNascimento(dto.getDataNascimento());
        cliente.setCep(dto.getCep());
        cliente.setEmail(dto.getEmail());
        cliente.setSenha(passwordEncoder.encode(dto.getSenha())); 
        cliente.setDataCadastro(LocalDateTime.now());

        Cliente saved = clienteRepository.save(cliente);

        Conta conta = new Conta();
        conta.setCliente(saved);
        conta.setNumero(UUID.randomUUID().toString().substring(0, 8));
        conta.setAgencia("0001");
        conta.setSaldo(java.math.BigDecimal.ZERO);  
        conta.setTipo(TipoConta.CORRENTE);
        contaRepository.save(conta);

        return saved;
    }

    public Cliente buscarPorEmail(String email) {
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Cliente não encontrado"));
    }
}