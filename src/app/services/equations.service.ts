import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquationsService {

  constructor() { }

  calculateExponentialTrendLine(data: number[]): number[] {
    const trendLine = [];
    const a = data[0];
    const b = Math.log(data[data.length - 1] / a) / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
      trendLine.push(a * Math.exp(b * i));
    }
    return trendLine;
  }

  calculateArithmeticTrendLine(data: number[]): number[] {
    const n = data.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    for (let i = 0; i < n; i++) {
      sumX += i + 1;
      sumY += data[i];
      sumXY += (i + 1) * data[i];
      sumX2 += Math.pow((i + 1), 2);
    }
    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - Math.pow(sumX, 2));
    const b = (sumY - m * sumX) / n;
    const trendLine = [];
    for (let i = 0; i < n; i++) {
      trendLine.push(m * (i + 1) + b);
    }
    return trendLine;
  }

  calculateLogarirmicTrendLine(data: number[]): number[] {
    const n = data.length;
    let sumXlnY = 0;
    let sumlnX = 0;
    let sumY = 0;
    let sumlnX2 = 0;

    for (let i = 0; i < n; i++) {
      sumlnX += Math.log(i + 1);
      sumXlnY += Math.log(i + 1) * data[i];
      sumY += data[i];
      sumlnX2 += Math.pow(Math.log(i + 1), 2);
    }

    const A = (n * sumXlnY - sumlnX * sumY) / (n * sumlnX2 - Math.pow(sumlnX, 2));
    const B = (sumY - A * sumlnX) / n;
    const trendLine = [];
    for (let i = 0; i < n; i++) {
      trendLine.push(A * Math.log(i + 1) + B);
    }
    return trendLine;
  }

  sort(dataParam: any, LabelParam: any) {
    let data = dataParam;
    let labels = LabelParam;
    let dataWithLabels = [];
    for (let i = 0; i < data.length; i++) {
      dataWithLabels.push({
        data: data[i],
        label: labels[i],
      });
    }
    dataWithLabels.sort((first: any, second: any) => first.data - second.data);
    for (let i = 0; i < dataWithLabels.length; i++) {
      data[i] = dataWithLabels[i].data;
      labels[i] = dataWithLabels[i].label;
    }
    return dataWithLabels
  }

  unSort(dataParam: any, LabelParam: any) {
    let data = dataParam;
    let labels = LabelParam;
    let dataWithLabels = [];
    for (let i = 0; i < data.length; i++) {
      dataWithLabels.push({
        data: data[i],
        label: labels[i],
      });
    }
    dataWithLabels.sort((first: any, second: any) => first.label - second.label);
    for (let i = 0; i < dataWithLabels.length; i++) {
      data[i] = dataWithLabels[i].data;
      labels[i] = dataWithLabels[i].label;
    }
    return dataWithLabels
  }


  calculateAverage(data: number[]): number {
    return data.reduce((acc, value) => acc + value, 0) / data.length;
}

calculateStandardDeviation(data: number[], mean: number): number {
    const squaredDifferences = data.map(value => Math.pow(value - mean, 2));
    const variance = this.calculateAverage(squaredDifferences);
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}

calculateMedian(data: number[]): number {
    data.sort((a, b) => a - b);
    const length = data.length;
    if (length % 2 === 1) {
        return data[Math.floor(length / 2)];
    } else {
        const middleIndex = length / 2;
        return (data[middleIndex - 1] + data[middleIndex]) / 2;
    }
}

removeOutliers(data: number[], stdDevThreshold: number): number[] {
    const mean = this.calculateAverage(data);
    const stdDev = this.calculateStandardDeviation(data, mean);
    const lowerBound = mean - stdDevThreshold * stdDev;
    const upperBound = mean + stdDevThreshold * stdDev;
    return data.filter(value => value >= lowerBound && value <= upperBound);
}
}
