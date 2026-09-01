package controller;

import dto.DepositoRequestDTO;
import dto.SaqueRequestDTO;
import model.Transacao;
import service.ContaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @PostMapping("/{contaId}/deposito")
    public ResponseEntity<Transacao> depositar(
            @PathVariable Long contaId,
            @Valid @RequestBody DepositoRequestDTO request) {
        Transacao t = contaService.depositar(contaId, request.getValor());
        return ResponseEntity.ok(t);
    }

    @PostMapping("/{contaId}/saque")
    public ResponseEntity<Transacao> sacar(
            @PathVariable Long contaId,
            @Valid @RequestBody SaqueRequestDTO request) {
        Transacao t = contaService.sacar(contaId, request.getValor());
        return ResponseEntity.ok(t);
    }
}