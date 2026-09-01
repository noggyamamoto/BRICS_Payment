package model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "investimentos")

public class Investimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_conta", nullable = false)
    private Conta conta;

    @ManyToOne
    @JoinColumn(name = "id_produto", nullable = false)
    private ProdutoInvestimento produto;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal valorAplicado;

    private LocalDate dataAplicacao = LocalDate.now();

    @Enumerated(EnumType.STRING)
    private StatusInvestimento status = StatusInvestimento.ATIVO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Conta getConta() {
        return conta;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public ProdutoInvestimento getProduto() {
        return produto;
    }

    public void setProduto(ProdutoInvestimento produto) {
        this.produto = produto;
    }

    public BigDecimal getValorAplicado() {
        return valorAplicado;
    }

    public void setValorAplicado(BigDecimal valorAplicado) {
        this.valorAplicado = valorAplicado;
    }

    public LocalDate getDataAplicacao() {
        return dataAplicacao;
    }

    public void setDataAplicacao(LocalDate dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
    }

    public StatusInvestimento getStatus() {
        return status;
    }

    public void setStatus(StatusInvestimento status) {
        this.status = status;
    }
}
