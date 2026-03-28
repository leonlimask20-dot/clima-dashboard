import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaCidadeComponent } from '../../components/busca-cidade/busca-cidade';
import { CartaoClimaComponent } from '../../components/cartao-clima/cartao-clima';
import { PrevisaoComponent } from '../../components/previsao/previsao';
import { ClimaService, DadosClima } from '../../services/clima';

/**
 * HomeComponent — página principal do dashboard.
 *
 * Orquestra os componentes filhos e gerencia o estado da busca.
 * Fluxo de dados no Angular (unidirecional, igual ao React):
 *
 * HomeComponent (estado)
 *   → BuscaCidade: emite evento (buscar)
 *   → HomeComponent: chama ClimaService
 *   → CartaoClima: recebe @Input() dados
 *   → Previsao: recebe @Input() previsao
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    BuscaCidadeComponent,
    CartaoClimaComponent,
    PrevisaoComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  dados: DadosClima | null = null;
  carregando = false;
  erro: string | null = null;

  constructor(private climaService: ClimaService) {}

  onBuscar(cidade: string): void {
    this.carregando = true;
    this.erro = null;
    this.dados = null;

    this.climaService.buscarClimaPorCidade(cidade).subscribe({
      next: dados => {
        this.dados = dados;
        this.carregando = false;
      },
      error: err => {
        this.erro = err.message || 'Erro ao buscar dados climáticos';
        this.carregando = false;
      },
    });
  }
}
