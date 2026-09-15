package controller;

import dto.DepositoRequestDTO;
import dto.SaqueRequestDTO;
import model.Conta;
import model.Transacao;
import service.ContaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    /** Busca os dados de uma conta (saldo, número, agência). */
    @GetMapping("/{contaId}")
    public ResponseEntity<Conta> buscar(@PathVariable Long contaId) {
        return ResponseEntity.ok(contaService.buscarConta(contaId));
    }

    /** Lista as transações de uma conta (extrato), com filtros opcionais. */
    @GetMapping("/{contaId}/extrato")
    public ResponseEntity<List<Transacao>> extrato(
            @PathVariable Long contaId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(contaService.extrato(contaId, inicio, fim));
    }

    @PostMapping("/{contaId}/deposito")
    public ResponseEntity<Transacao> depositar(
            @PathVariable Long contaId,
            @Valid @RequestBody DepositoRequestDTO request) {
        return ResponseEntity.ok(contaService.depositar(contaId, request.getValor()));
    }

    @PostMapping("/{contaId}/saque")
    public ResponseEntity<Transacao> sacar(
            @PathVariable Long contaId,
            @Valid @RequestBody SaqueRequestDTO request) {
        return ResponseEntity.ok(contaService.sacar(contaId, request.getValor()));
    }
}