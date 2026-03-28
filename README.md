# Clima Dashboard

![CI](https://github.com/leonlimask20-dot/clima-dashboard/actions/workflows/ci.yml/badge.svg)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?logo=sass&logoColor=white)

Dashboard de previsão do tempo em tempo real construído com Angular 19, consumindo a Open-Meteo API — gratuita e sem necessidade de cadastro.

---

## Links rápidos

| | |
|---|---|
| Rodar localmente | `ng serve` |
| Build de produção | `ng build` |
| API utilizada | [open-meteo.com](https://open-meteo.com) |

---

## Principais competências demonstradas

- **Angular 19** com Standalone Components — sem NgModules
- **HttpClient** com Observables — `switchMap`, `map`, encadeamento reativo
- **@Input() e @Output()** — comunicação entre componentes pai e filho
- **Services com @Injectable** — lógica de negócio separada dos componentes
- **Two-way data binding** com `[(ngModel)]` e `FormsModule`
- **Diretivas estruturais** — `*ngFor`, `*ngIf`, `[class.ativo]`, `[style.color]`
- **SCSS com variáveis e responsividade** — Mobile First com media queries
- **Roteamento** com `RouterOutlet` e lazy loading pronto para escalar
- **Pipe de data nativo** do Angular para formatação de datas
- **Zone.js** configurado explicitamente no `angular.json`
- Pipeline CI com GitHub Actions — build de produção a cada push

---

## Comparação com React (Monitor de Clima)

Este projeto implementa as mesmas funcionalidades do [Monitor de Clima](https://github.com/leonlimask20-dot/monitor-clima) feito em React, permitindo comparar os dois frameworks lado a lado:

| Conceito | React | Angular |
|---|---|---|
| Lógica de API | Hook customizado `useClima` | Service `ClimaService` |
| Estado local | `useState` | propriedade da classe |
| Efeito colateral | `useEffect` | `subscribe()` no método |
| Props filho→pai | callback prop | `@Output() EventEmitter` |
| Props pai→filho | props | `@Input()` |
| HTTP | `fetch()` | `HttpClient` + Observable |
| Lista | `.map()` | `*ngFor` |
| Condicional | `&&` / ternário | `*ngIf` |

---

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| Angular | 19 | Framework principal |
| TypeScript | 5 | Tipagem estática |
| RxJS | 7 | Programação reativa (Observables) |
| SCSS | — | Estilização com variáveis |
| Zone.js | — | Detecção de mudanças |
| Open-Meteo API | — | Dados climáticos gratuitos |
| GitHub Actions | — | CI/CD |

---

## Arquitetura

```
src/app/
├── services/
│   └── clima.ts              ← ClimaService com HttpClient e Observables
├── components/
│   ├── busca-cidade/         ← [(ngModel)] two-way binding + @Output EventEmitter
│   ├── cartao-clima/         ← @Input() com dados climáticos atuais
│   └── previsao/             ← @Input() com previsão 7 dias + *ngFor
└── pages/
    └── home/                 ← Orquestra componentes + gerencia estado
```

---

## Funcionalidades

- Busca de qualquer cidade do mundo com prioridade para o Brasil
- Atalhos rápidos para 6 cidades principais
- Temperatura atual, sensação térmica, umidade e velocidade do vento
- Descrição e ícone do clima baseados no código WMO
- Previsão de 7 dias com máxima, mínima e precipitação
- Destaque visual para o dia atual na previsão
- Indicador de loading e mensagem de erro amigável

---

## Como executar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
ng serve

# Acesse http://localhost:4200
```

---

## Como funciona a API

```
1. Usuário digita o nome da cidade
2. Geocoding API → converte nome em coordenadas (latitude/longitude)
3. Forecast API  → retorna clima atual + previsão 7 dias
4. switchMap     → encadeia as duas requisições em sequência
```

A API Open-Meteo é pública, gratuita e sem necessidade de chave de acesso.

---

## Autor

**LNL**
GitHub: [@leonlimask20-dot](https://github.com/leonlimask20-dot)
Email: leonlimask@gmail.com
