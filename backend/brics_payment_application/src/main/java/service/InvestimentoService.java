package service;

import dto.InvestimentoRequestDTO;
import model.*;
import repository.ContaRepository;
import repository.InvestimentoRepository;
import repository.ProdutoInvestimentoRepository;
import exception.BusinessException;
import exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private ProdutoInvestimentoRepository produtoRepository;

    @Autowired
    private ContaRepository contaRepository;   // usado para buscar a conta

    @Autowired
    private ContaService contaService;         // reaproveita a lógica de saque

    @Transactional
    public Investimento comprar(InvestimentoRequestDTO dto) {
        // Busca a conta pelo ID DA CONTA
        Conta conta = contaRepository.findById(dto.getContaId())
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada"));

        ProdutoInvestimento produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));

        if (dto.getValorAplicado().compareTo(produto.getValorMinimo()) < 0) {
            throw new BusinessException("Valor mínimo de aplicação é " + produto.getValorMinimo());
        }
        if (conta.getSaldo().compareTo(dto.getValorAplicado()) < 0) {
            throw new BusinessException("Saldo insuficiente para este investimento");
        }

        // O saque debita o saldo E registra uma Transacao do tipo SAQUE.
        contaService.sacar(conta.getId(), dto.getValorAplicado());

        // Registra o investimento
        Investimento investimento = new Investimento();
        investimento.setConta(conta);
        investimento.setProduto(produto);
        investimento.setValorAplicado(dto.getValorAplicado());
        investimento.setStatus(StatusInvestimento.ATIVO);
        investimento.setDataAplicacao(java.time.LocalDate.now());

        return investimentoRepository.save(investimento);
    }

    /** Lista todos os produtos de investimento disponíveis. */
    public List<ProdutoInvestimento> listarProdutos() {
        return produtoRepository.findAll();
    }

    /** Lista os investimentos de uma conta específica. */
    public List<Investimento> listarPorConta(Long contaId) {
        return investimentoRepository.findByContaId(contaId);
    }
}