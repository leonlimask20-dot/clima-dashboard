import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';

/**
 * ClimaService — serviço Angular para integração com a Open-Meteo API.
 *
 * No Angular, Services são classes singleton injetáveis (@Injectable).
 * É o equivalente ao hook customizado useClima do React —
 * mas aqui a lógica fica no serviço, não no componente.
 *
 * @Injectable({ providedIn: 'root' }) → disponível em toda a aplicação
 * sem precisar declarar em nenhum módulo.
 *
 * HttpClient → equivalente ao fetch() do JavaScript.
 * Retorna Observables em vez de Promises — padrão reativo do Angular.
 */
@Injectable({ providedIn: 'root' })
export class ClimaService {

  private readonly URL_GEO   = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly URL_CLIMA = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  /**
   * Busca coordenadas da cidade e depois o clima.
   * forkJoin: executa duas requisições em paralelo (equivalente ao Promise.all)
   * switchMap: encadeia observables (equivalente ao .then())
   */
  buscarClimaPorCidade(nome: string): Observable<DadosClima> {
    const params = { name: nome, count: '5', language: 'pt', format: 'json' };

    return this.http.get<any>(this.URL_GEO, { params }).pipe(
      map(res => {
        const resultados = res.results || [];
        const brasil = resultados.find((r: any) => r.country_code === 'BR');
        const local = brasil || resultados[0];
        if (!local) throw new Error(`Cidade "${nome}" não encontrada`);
        return local;
      }),
      switchMap(local => {
        const params = {
          latitude:        local.latitude,
          longitude:       local.longitude,
          current_weather: 'true',
          hourly:          'relativehumidity_2m,apparent_temperature',
          daily:           'temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum',
          timezone:        'America/Sao_Paulo',
          forecast_days:   '7',
        };

        return this.http.get<any>(this.URL_CLIMA, { params }).pipe(
          map(clima => {
            const hora = new Date().getHours();
            return {
              cidade:         local.name,
              estado:         local.admin1 || '',
              pais:           local.country || '',
              latitude:       local.latitude,
              longitude:      local.longitude,
              temperatura:    clima.current_weather.temperature,
              vento:          clima.current_weather.windspeed,
              codigoClima:    clima.current_weather.weathercode,
              umidade:        clima.hourly.relativehumidity_2m[hora],
              sensacaoTermica: clima.hourly.apparent_temperature[hora],
              previsao:       clima.daily.time.map((data: string, i: number) => ({
                data,
                tempMax:   clima.daily.temperature_2m_max[i],
                tempMin:   clima.daily.temperature_2m_min[i],
                codigo:    clima.daily.weathercode[i],
                chuva:     clima.daily.precipitation_sum[i],
              })),
            } as DadosClima;
          })
        );
      })
    );
  }

  interpretarCodigo(codigo: number): { descricao: string; icone: string; cor: string } {
    if (codigo === 0)   return { descricao: 'Céu limpo',          icone: '☀️',  cor: '#f59e0b' };
    if (codigo <= 2)    return { descricao: 'Parcialmente nublado', icone: '⛅', cor: '#60a5fa' };
    if (codigo === 3)   return { descricao: 'Nublado',             icone: '☁️',  cor: '#94a3b8' };
    if (codigo <= 49)   return { descricao: 'Neblina',             icone: '🌫️', cor: '#94a3b8' };
    if (codigo <= 59)   return { descricao: 'Garoa',               icone: '🌦️', cor: '#60a5fa' };
    if (codigo <= 69)   return { descricao: 'Chuva',               icone: '🌧️', cor: '#3b82f6' };
    if (codigo <= 79)   return { descricao: 'Neve',                icone: '❄️',  cor: '#bfdbfe' };
    if (codigo <= 84)   return { descricao: 'Pancadas de chuva',   icone: '⛈️', cor: '#2563eb' };
    if (codigo <= 99)   return { descricao: 'Trovoada',            icone: '⛈️', cor: '#dc2626' };
    return               { descricao: 'Desconhecido',              icone: '❓',  cor: '#94a3b8' };
  }
}

export interface DadosClima {
  cidade:          string;
  estado:          string;
  pais:            string;
  latitude:        number;
  longitude:       number;
  temperatura:     number;
  vento:           number;
  codigoClima:     number;
  umidade:         number;
  sensacaoTermica: number;
  previsao:        PrevisaoDia[];
}

export interface PrevisaoDia {
  data:    string;
  tempMax: number;
  tempMin: number;
  codigo:  number;
  chuva:   number;
}
