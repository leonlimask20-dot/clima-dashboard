import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosClima, ClimaService } from '../../services/clima';

/**
 * CartaoClimaComponent — exibe dados climáticos atuais.
 *
 * @Input(): recebe dados do componente pai.
 * É o equivalente às props no React.
 *
 * No Angular, a comunicação de dados segue sempre:
 * Pai → Filho: @Input() (props)
 * Filho → Pai: @Output() EventEmitter (callbacks)
 */
@Component({
  selector:    'app-cartao-clima',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './cartao-clima.html',
  styleUrl:    './cartao-clima.scss',
})
export class CartaoClimaComponent {
  @Input() dados!: DadosClima;

  constructor(public climaService: ClimaService) {}

  get info() {
    return this.climaService.interpretarCodigo(this.dados.codigoClima);
  }
}
