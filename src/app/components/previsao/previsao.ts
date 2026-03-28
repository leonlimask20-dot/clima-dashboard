import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrevisaoDia, ClimaService } from '../../services/clima';

@Component({
  selector:    'app-previsao',
  standalone:  true,
  imports:     [CommonModule],
  templateUrl: './previsao.html',
  styleUrl:    './previsao.scss',
})
export class PrevisaoComponent {
  @Input() previsao: PrevisaoDia[] = [];

  constructor(public climaService: ClimaService) {}

  formatarData(data: string): string {
    const d = new Date(data + 'T12:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
  }

  isHoje(data: string): boolean {
    return data === new Date().toISOString().split('T')[0];
  }
}
