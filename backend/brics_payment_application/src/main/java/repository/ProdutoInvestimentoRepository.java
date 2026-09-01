package repository;

import model.ProdutoInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoInvestimentoRepository extends JpaRepository<ProdutoInvestimento, Long> {
}