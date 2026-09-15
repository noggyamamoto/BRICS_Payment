package dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import jakarta.validation.constraints.DecimalMin;

public class InvestimentoRequestDTO {

    @NotNull(message = "ID da conta obrigatório")
    private Long contaId;

    @NotNull(message = "ID do produto obrigatório")
    private Long produtoId;

    @NotNull(message = "Valor obrigatório")
    @DecimalMin(value = "0.01", message = "Valor mínimo de aplicação é 0.01")
    private BigDecimal valorAplicado;

    public Long getContaId() {
        return contaId;
    }

    public void setContaId(Long contaId) {
        this.contaId = contaId;
    }

    public Long getProdutoId() {
        return produtoId;
    }

    public void setProdutoId(Long produtoId) {
        this.produtoId = produtoId;
    }

    public BigDecimal getValorAplicado() {
        return valorAplicado;
    }

    public void setValorAplicado(BigDecimal valorAplicado) {
        this.valorAplicado = valorAplicado;
    }
}