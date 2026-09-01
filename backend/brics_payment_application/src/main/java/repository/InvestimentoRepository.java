package repository;

import model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
    List<Investimento> findByContaId(Long contaId);
}