package controller;

import dto.InvestimentoRequestDTO;
import model.Investimento;
import service.InvestimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/investimentos")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    @PostMapping
    public ResponseEntity<Investimento> comprar(@Valid @RequestBody InvestimentoRequestDTO dto) {
        Investimento investimento = investimentoService.comprar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(investimento);
    }
}