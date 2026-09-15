import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestimentoService } from '../../../core/services/investimento.service';
import { TokenService } from '../../../core/services/token.service';
import { ProdutoInvestimento } from '../../../shared/models/produto-investimento.model';

/**
 * Tela de compra de investimento.
 * POST /api/v1/investimentos { contaId, produtoId, valorAplicado }
 */
@Component({
  selector: 'app-investimento-comprar',
  templateUrl: './investimento-comprar.component.html',
  styleUrls: ['./investimento-comprar.component.css']
})
export class InvestimentoComprarComponent implements OnInit {
  form: FormGroup;
  produto?: ProdutoInvestimento;
  carregando = false;
  mensagem = '';
  erro = '';
  produtoId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private service: InvestimentoService,
    private tokenService: TokenService
  ) {
    this.form = this.fb.group({
      valorAplicado: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    // Pega o ID do produto da URL e carrega os dados
    this.produtoId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.listarProdutos().subscribe({
      next: (produtos) => {
        this.produto = produtos.find(p => p.id === this.produtoId);
        if (this.produto) {
          // Pré-preenche com o valor mínimo
          this.form.patchValue({ valorAplicado: this.produto.valorMinimo });
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.carregando = true;
    this.erro = '';

    const contaId = this.tokenService.getUser()?.contaId || 1;

    this.service.comprar(contaId, this.produtoId, this.form.value.valorAplicado).subscribe({
      next: () => {
        this.mensagem = 'Investimento realizado com sucesso!';
        setTimeout(() => this.router.navigate(['/investimentos']), 1200);
      },
      error: (err) => {
        this.erro = err?.error?.erro || 'Erro ao investir';
        this.carregando = false;
      }
    });
  }

  formatBRL(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }
}