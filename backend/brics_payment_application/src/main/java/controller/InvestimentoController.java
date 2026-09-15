package controller;

import dto.InvestimentoRequestDTO;
import model.Investimento;
import model.ProdutoInvestimento;
import service.InvestimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/investimentos")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    /** Lista o catálogo de produtos de investimento (público). */
    @GetMapping("/produtos")
    public ResponseEntity<List<ProdutoInvestimento>> listarProdutos() {
        return ResponseEntity.ok(investimentoService.listarProdutos());
    }

    /** Lista os investimentos de uma conta. */
    @GetMapping("/conta/{contaId}")
    public ResponseEntity<List<Investimento>> listarPorConta(@PathVariable Long contaId) {
        return ResponseEntity.ok(investimentoService.listarPorConta(contaId));
    }

    /** Registra a compra de um investimento. */
    @PostMapping
    public ResponseEntity<Investimento> comprar(@Valid @RequestBody InvestimentoRequestDTO dto) {
        Investimento investimento = investimentoService.comprar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(investimento);
    }
}