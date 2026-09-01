package controller;

import dto.ClienteDTO;
import model.Cliente;
import service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ResponseEntity<Cliente> cadastrar(@Valid @RequestBody ClienteDTO dto) {
        Cliente novo = clienteService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novo);
    }
}