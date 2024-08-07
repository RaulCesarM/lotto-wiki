import { Injectable } from '@angular/core';
import { DataSets } from '../models/dataSets';
import { ChartTypeRegistry } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class RankingService  {
  originalDataSource: number[] = []

  type: ChartTypeRegistry | 'bar' | undefined;
  constructor() { }

  labelsDataSource =['1','2', '3','4', '5','6','7','8','9','10','11', '12', '13', '14', '15', '16','17', '18', '19', '20','21', '22', '23', '24', '25']

    getDataSets(): DataSets[] {
   return [
      new DataSets(
        'Ocorrencias',
        [],
        'rgba(55, 169, 245,0.5)',
        'rgba(75, 192, 192, 1)',
        1,
        false,
        this.type as unknown as keyof ChartTypeRegistry || 'bar',
        1
      ),
      new DataSets(
        'Média',
        [],
        '',
        'rgba(255, 0, 0, 1)',
        1,
        false,
        'line',
        1
      ),
      new DataSets(
        'Linha de Tendência Exponencial',
        [],
        '',
        'rgba(0, 120, 255, 1)',
        1,
        false,
        'line',
        1
      ),
      new DataSets(
        'Linha de Tendência Aritmetica',
        [],
        '',
        'rgba(0, 0, 0, 1)',
        2,
        false,
        'line',
        1
      ),
      new DataSets(
        'Linha de Tendência Logaritmica',
        [],
        '',
        'rgba(0, 0, 0, 1)',
        1,
        false,
        'line',
        1
      ),
    ];
 
  }

}
