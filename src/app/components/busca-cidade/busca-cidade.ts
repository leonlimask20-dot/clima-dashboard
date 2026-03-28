import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * BuscaCidadeComponent — formulário de busca com two-way data binding.
 *
 * No Angular, [(ngModel)] é o equivalente ao value + onChange do React.
 * É chamado de "two-way binding" — o modelo e a view ficam sincronizados.
 *
 * @Output() EventEmitter: comunica eventos do filho para o pai.
 * É o equivalente às props de callback no React (onBuscar, onClick).
 */
@Component({
  selector:    'app-busca-cidade',
  standalone:  true,
  imports:     [CommonModule, FormsModule],
  templateUrl: './busca-cidade.html',
  styleUrl:    './busca-cidade.scss',
})
export class BuscaCidadeComponent {
  @Output() buscar = new EventEmitter<string>();

  cidade = '';
  carregando = false;

  cidadesRapidas = [
    'Manaus', 'São Paulo', 'Rio de Janeiro',
    'Brasília', 'Fortaleza', 'Salvador',
  ];

  onSubmit(): void {
    if (this.cidade.trim()) {
      this.buscar.emit(this.cidade.trim());
    }
  }

  buscarRapido(cidade: string): void {
    this.cidade = cidade;
    this.buscar.emit(cidade);
  }
}
