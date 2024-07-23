import { Injectable } from '@angular/core';
import { CorrelationsRepository } from '../data/repositories/correlationsRepository';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CorrelationsService {

  matrix: number[][] = [];

  constructor(
    private dataService: CorrelationsRepository,
    private loading: LoadingService) {}


  async loadData(): Promise<void> {
    this.dataService.getData().subscribe(console.log);
    this.loading.loadingOn();
    try {
      this.matrix = await firstValueFrom(this.dataService.getData());
    } catch (error) {
      console.error(error);
    }
    this.loading.loadingOff();
  }

  getData(): number[][] {
    return this.matrix
  }

  calculateAverage(): number {
    const data = this.getData();
    const totalElements = data.length * data[0].length;
    const sum = data.reduce((accRow, row) => accRow + row.reduce((accCell, cell) => accCell + cell, 0), 0);
    return sum / totalElements;
  }

  findMaxValue(): number {
    const data = this.getData();
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (const row of data) {
      for (const cell of row) {
        maxValue = Math.max(maxValue, cell);
      }
    }

    return maxValue;
  }

  findMinValue(): number {
    const data = this.getData();
    let minValue = Number.MAX_SAFE_INTEGER;
    for (const row of data) {
      for (const cell of row) {
        minValue = Math.min(minValue, cell);
      }
    }

    return minValue;
  }
}
