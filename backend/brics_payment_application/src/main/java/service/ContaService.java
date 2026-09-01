package service;

import model.Conta;
import model.Transacao;
import model.TipoTransacao;
import repository.ContaRepository;
import repository.TransacaoRepository;
import exception.BusinessException;
import exception.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Transactional
    public Transacao depositar(Long contaId, BigDecimal valor) {
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada"));

        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("Valor do depósito deve ser positivo");
        }

        conta.setSaldo(conta.getSaldo().add(valor));
        contaRepository.save(conta);

        Transacao transacao = new Transacao();
        transacao.setConta(conta);
        transacao.setTipo(TipoTransacao.DEPOSITO);
        transacao.setValor(valor);
        transacao.setData(LocalDateTime.now());
        transacao.setDescricao("Depósito realizado");
        return transacaoRepository.save(transacao);
    }

    @Transactional
    public Transacao sacar(Long contaId, BigDecimal valor) {
        Conta conta = contaRepository.findById(contaId)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada"));

        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new BusinessException("Valor do saque deve ser positivo");
        }
        if (conta.getSaldo().compareTo(valor) < 0) {
            throw new BusinessException("Saldo insuficiente");
        }

        conta.setSaldo(conta.getSaldo().subtract(valor));
        contaRepository.save(conta);

        Transacao transacao = new Transacao();
        transacao.setConta(conta);
        transacao.setTipo(TipoTransacao.SAQUE);
        transacao.setValor(valor);
        transacao.setData(LocalDateTime.now());
        transacao.setDescricao("Saque realizado");
        return transacaoRepository.save(transacao);
    }

    public Conta buscarContaPorCliente(Long clienteId) {
        return contaRepository.findByClienteId(clienteId)
                .orElseThrow(() -> new EntityNotFoundException("Conta não encontrada para este cliente"));
    }
}