package model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "produtos_investimento")

public class ProdutoInvestimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private BigDecimal taxaRetorno;
    private Integer prazoMinimo;
    private BigDecimal valorMinimo;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public BigDecimal getTaxaRetorno() {
        return taxaRetorno;
    }
    public void setTaxaRetorno(BigDecimal taxaRetorno) {
        this.taxaRetorno = taxaRetorno;
    }
    public Integer getPrazoMinimo() {
        return prazoMinimo;
    }
    public void setPrazoMinimo(Integer prazoMinimo) {
        this.prazoMinimo = prazoMinimo;
    }
    public BigDecimal getValorMinimo() {
        return valorMinimo;
    }
    public void setValorMinimo(BigDecimal valorMinimo) {
        this.valorMinimo = valorMinimo;
    }
}
