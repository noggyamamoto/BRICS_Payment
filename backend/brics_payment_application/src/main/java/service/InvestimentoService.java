package service;

import dto.InvestimentoRequestDTO;
import model.*;
import repository.InvestimentoRepository;
import repository.ProdutoInvestimentoRepository;
import repository.TransacaoRepository;
import exception.BusinessException;
import exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private ProdutoInvestimentoRepository produtoRepository;

    @Autowired
    private ContaService contaService;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Transactional
    public Investimento comprar(InvestimentoRequestDTO dto) {
        Conta conta = contaService.buscarContaPorCliente(dto.getContaId()); // ou por ID direto
        ProdutoInvestimento produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        if (dto.getValorAplicado().compareTo(produto.getValorMinimo()) < 0) {
            throw new BusinessException("Valor mínimo de aplicação é " + produto.getValorMinimo());
        }
        if (conta.getSaldo().compareTo(dto.getValorAplicado()) < 0) {
            throw new BusinessException("Saldo insuficiente para este investimento");
        }

        // Debita da conta
        conta.setSaldo(conta.getSaldo().subtract(dto.getValorAplicado()));
        contaService.sacar(conta.getId(), dto.getValorAplicado()); // reutiliza lógica de saque

        // Registra investimento
        Investimento investimento = new Investimento();
        investimento.setConta(conta);
        investimento.setProduto(produto);
        investimento.setValorAplicado(dto.getValorAplicado());
        investimento.setStatus(StatusInvestimento.ATIVO);

        return investimentoRepository.save(investimento);
    }
}