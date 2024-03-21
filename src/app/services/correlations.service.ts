import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorrelationsService {

  constructor() { }

  getData(): number[] [] {
    return [
      [0.8, 0.6, 0.5, 0.7, 0.4, 0.8, 0.5, 0.7, 0.4, 0.8, 0.5, 0.8, 0.3, 0.6, 0.8, 0.4, 0.6, 0.4, 0.6, 0.5, 0.3, 0.6, 0.7, 0.6, 1.0],
      [0.3, 0.7, 0.5, 0.7, 0.6, 0.7, 0.5, 0.4, 0.6, 0.7, 0.3, 0.8, 0.5, 0.8, 0.4, 0.6, 0.7, 0.6, 0.4, 0.3, 0.7, 0.7, 0.4, 1.0, 0.7],
      [0.6, 0.8, 0.5, 0.3, 0.7, 0.7, 0.5, 0.6, 0.8, 0.4, 0.7, 0.7, 0.6, 0.6, 0.7, 0.5, 0.8, 0.5, 0.6, 0.7, 0.4, 0.6, 1.0, 0.7, 0.6],
      [0.6, 0.4, 0.7, 0.6, 0.3, 0.6, 0.8, 0.5, 0.4, 0.6, 0.3, 0.8, 0.7, 0.7, 0.7, 0.5, 0.7, 0.7, 0.4, 0.6, 0.4, 1.0, 0.4, 0.4, 0.7],
      [0.7, 0.6, 0.5, 0.5, 0.4, 0.6, 0.7, 0.7, 0.7, 0.4, 0.7, 0.4, 0.5, 0.3, 0.7, 0.7, 0.5, 0.7, 0.5, 0.4, 1.0, 0.6, 0.7, 0.6, 0.5],
      [0.6, 0.8, 0.6, 0.8, 0.6, 0.5, 0.4, 0.6, 0.6, 0.7, 0.4, 0.3, 0.5, 0.5, 0.5, 0.8, 0.4, 0.8, 0.7, 1.0, 0.7, 0.5, 0.7, 0.8, 0.6],
      [0.4, 0.8, 0.7, 0.6, 0.7, 0.8, 0.5, 0.3, 0.4, 0.4, 0.6, 0.4, 0.4, 0.5, 0.6, 0.7, 0.4, 0.7, 1.0, 0.4, 0.6, 0.6, 0.7, 0.6, 0.5],
      [0.5, 0.7, 0.7, 0.7, 0.8, 0.4, 0.6, 0.4, 0.7, 0.7, 0.8, 0.4, 0.5, 0.5, 0.6, 0.4, 0.4, 1.0, 0.6, 0.6, 0.5, 0.6, 0.4, 0.6, 0.7],
      [0.5, 0.5, 0.4, 0.8, 0.4, 0.7, 0.4, 0.3, 0.7, 0.6, 0.7, 0.7, 0.5, 0.6, 0.4, 0.4, 1.0, 0.5, 0.8, 0.4, 0.4, 0.7, 0.5, 0.6, 0.6],
      [0.4, 0.4, 0.7, 0.3, 0.5, 0.5, 0.4, 0.8, 0.7, 0.4, 0.7, 0.5, 0.5, 0.7, 0.4, 1.0, 0.5, 0.3, 0.4, 0.7, 0.5, 0.6, 0.3, 0.5, 0.4],
      [0.4, 0.7, 0.3, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.8, 0.7, 0.6, 0.7, 0.7, 1.0, 0.7, 0.7, 0.5, 0.3, 0.4, 0.6, 0.4, 0.6, 0.7, 0.6],
      [0.6, 0.4, 0.4, 0.5, 0.5, 0.7, 0.5, 0.7, 0.5, 0.7, 0.7, 0.4, 0.7, 1.0, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.3, 0.5, 0.8, 0.6, 0.5],
      [0.6,0.4, 0.6, 0.7, 0.6, 0.4, 0.7, 0.8, 0.6, 0.4, 0.7, 0.3, 0.8, 0.7, 0.6, 0.8, 0.5, 0.7, 0.5, 0.8, 0.4, 1.0, 0.4, 0.4, 0.7],
      [0.7, 0.6, 0.6, 0.7, 0.6, 0.6, 0.6, 0.6, 0.5, 0.6, 0.7, 0.7, 0.8, 0.4, 0.6, 0.5, 0.5, 0.7, 0.7, 0.4, 0.5, 0.6, 0.7, 0.5, 0.7],
      [0.7, 0.5, 1.0, 0.5, 0.7, 0.6, 0.6, 0.7, 0.6, 0.7, 0.6, 0.7, 0.5, 0.5, 0.7, 0.6, 0.7, 0.6, 0.7, 0.6, 0.4, 0.7, 0.4, 0.7, 0.8],
      [0.4, 1.0, 0.4, 0.8, 0.4, 0.7, 0.7, 0.6, 0.6, 0.5, 0.7, 0.7, 0.7, 0.5, 0.7, 0.7, 0.6, 0.7, 0.7, 0.7, 0.5, 0.4, 0.7, 0.7, 0.8],
      [1.0, 0.6, 0.6, 0.8, 0.5, 0.6, 0.7, 0.6, 0.4, 0.7, 0.7, 0.6, 0.6, 0.7, 0.6, 0.5, 0.7, 0.6, 0.8, 0.5, 0.5, 0.7, 0.6, 0.6, 0.7],
      [0.5, 0.5, 0.4, 1.0, 0.4, 0.7, 0.6, 0.6, 0.6, 0.5, 0.7, 0.7, 0.5, 0.7, 0.5, 0.4, 1.0, 0.4, 0.8, 0.5, 0.5, 0.7, 0.6, 0.7, 0.7],
      [0.4, 0.7, 0.3, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.8, 0.7, 0.6, 0.7, 0.7, 1.0, 0.7, 0.7, 0.5, 0.3, 0.4, 0.6, 0.4, 0.6, 0.7, 0.6],
      [0.6, 0.4, 0.4, 0.5, 0.5, 0.7, 0.5, 0.7, 0.5, 0.7, 0.7, 0.4, 0.7, 1.0, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.3, 0.5, 0.8, 0.6, 0.5],
      [0.6, 0.4, 0.6, 0.5, 0.7, 0.6, 0.7, 0.4, 0.7, 0.6, 0.6, 0.7, 0.5, 0.5, 0.7, 0.5, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.7, 0.5, 0.6],
      [0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.6, 0.7, 0.7, 0.7, 0.5, 0.6, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.6, 0.7, 0.5, 0.7],
      [0.7, 0.5, 1.0, 0.5, 0.7, 0.6, 0.6, 0.7, 0.6, 0.7, 0.6, 0.7, 0.5, 0.5, 0.7, 0.6, 0.7, 0.6, 0.7, 0.6, 0.4, 0.7, 0.4, 0.7, 0.8],
      [0.4, 1.0, 0.4, 0.8, 0.4, 0.7, 0.7, 0.6, 0.6, 0.5, 0.7, 0.7, 0.7, 0.5, 0.7, 0.7, 0.6, 0.7, 0.7, 0.7, 0.5, 0.4, 0.7, 0.7, 0.8],
      [1.0, 0.6, 0.6, 0.8, 0.5,0.6, 0.6, 0.7, 0.6, 0.6, 0.7, 0.6, 0.7, 0.5, 0.6, 0.6, 0.6, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.7, 0.5],
      [0.5, 0.5, 0.4, 1.0, 0.4, 0.7, 0.6, 0.6, 0.6, 0.5, 0.7, 0.7, 0.5, 0.7, 0.5, 0.4, 1.0, 0.4, 0.8, 0.5, 0.5, 0.7, 0.6, 0.7, 0.7],
      [0.4, 0.7, 0.3, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.8, 0.7, 0.6, 0.7, 0.7, 1.0, 0.7, 0.7, 0.5, 0.3, 0.4, 0.6, 0.4, 0.6, 0.7, 0.6],
      [0.6, 0.4, 0.4, 0.5, 0.5, 0.7, 0.5, 0.7, 0.5, 0.7, 0.7, 0.4, 0.7, 1.0, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.3, 0.5, 0.8, 0.6, 0.5],
      [0.6, 0.4, 0.6, 0.5, 0.7, 0.6, 0.7, 0.4, 0.7, 0.6, 0.6, 0.7, 0.5, 0.5, 0.7, 0.5, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.7, 0.5, 0.6],
      [0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.6, 0.7, 0.7, 0.7, 0.5, 0.6, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.6, 0.7, 0.5, 0.7],
      [0.7, 0.5, 1.0, 0.5, 0.7, 0.6, 0.6, 0.7, 0.6, 0.7, 0.6, 0.7, 0.5, 0.5, 0.7, 0.6, 0.7, 0.6, 0.7, 0.6, 0.4, 0.7, 0.4, 0.7, 0.8],
      [0.4, 1.0, 0.4, 0.8, 0.4, 0.7, 0.7, 0.6, 0.6, 0.5, 0.7, 0.7, 0.7, 0.5, 0.7, 0.7, 0.6, 0.7, 0.7, 0.7, 0.5, 0.4, 0.7, 0.7, 0.8],
      [1.0, 0.6, 0.6, 0.8, 0.5, 0.6, 0.7, 0.6, 0.4, 0.7, 0.7, 0.6, 0.6, 0.7, 0.6, 0.6, 0.6, 0.7, 0.6, 0.7, 0.5, 0.6, 0.6, 0.6, 0.5],
      [0.5, 0.5, 0.4, 1.0, 0.4, 0.7, 0.6, 0.6, 0.6, 0.5, 0.7, 0.7, 0.5, 0.7, 0.5, 0.4, 1.0, 0.4, 0.8, 0.5, 0.5, 0.7, 0.6, 0.7, 0.7],
      [0.4, 0.7, 0.3, 0.4, 0.7, 0.3, 0.8, 0.5, 0.6, 0.8, 0.7, 0.6, 0.7, 0.7, 1.0, 0.7, 0.7, 0.5, 0.3, 0.4, 0.6, 0.4, 0.6, 0.7, 0.6],
      [0.6, 0.4, 0.4, 0.5, 0.5, 0.7, 0.5, 0.7, 0.5, 0.7, 0.7, 0.4, 0.7, 1.0, 0.7, 0.6, 0.6, 0.7, 0.7, 0.6, 0.3, 0.5, 0.8, 0.6, 0.5],
      [0.6, 0.4, 0.6, 0.5, 0.7, 0.6, 0.7, 0.4, 0.7, 0.6, 0.6, 0.7, 0.5, 0.5, 0.7, 0.5, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.7, 0.5, 0.6],
      [0.5, 0.6, 0.6, 0.6, 0.7, 0.7, 0.6, 0.5, 0.6, 0.6, 0.7, 0.7, 0.7, 0.5, 0.6, 0.6, 0.5, 0.7, 0.6, 0.4, 0.5, 0.6, 0.7, 0.5, 0.7],
      [0.7, 0.5, 1.0, 0.5, 0.7, 0.6, 0.6, 0.7, 0.6, 0.7, 0.6, 0.7, 0.5, 0.5, 0.7, 0.6, 0.7, 0.6, 0.7, 0.6, 0.4, 0.7, 0.4, 0.7, 0.8],
      [0.4, 1.0, 0.4, 0.8, 0.4, 0.7, 0.7, 0.6, 0.6, 0.5, 0.7, 0.7, 0.7, 0.5, 0.7, 0.7, 0.6, 0.7, 0.7, 0.7, 0.5, 0.4, 0.7, 0.7, 0.8],
      [1.0, 0.6, 0.6, 0.8, 0.5, 0.6, 0.7, 0.6, 0.4, 0.7, 0.7, 0.6, 0.6, 0.7, 0.6, 0.5, 0.7, 0.6, 0.8, 0.5, 0.5, 0.7, 0.6, 0.6, 0.7]
      ];
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
