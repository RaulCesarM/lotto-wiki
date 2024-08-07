import { Injectable } from '@angular/core';
import { DataLabelPair } from '../interfaces/data-label-pair';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() {}

 async calculateExponentialTrendLine(data: number[]):Promise< number[]> {
    const trendLine: number[] = [];
    const filteredData: number[] = data.filter(value => value !== 0);
    if (filteredData.length === 0) {
        return trendLine;  
    }
    const initialValue: number = filteredData[0];
    const growthRate: number = Math.log(filteredData[filteredData.length - 1] / initialValue) / (filteredData.length - 1);
    for (let i = 0; i < data.length; i++) {
        trendLine.push(initialValue * Math.exp(growthRate * i));
    }

    return trendLine;
}

async calculateArithmeticTrendLine(data: number[]): Promise< number[]> {
    const length: number = data.length;
    let sumX: number = 0;
    let sumY: number = 0;
    let sumXY: number = 0;
    let sumX2: number = 0;

    for (let i = 0; i < length; i++) {
        sumX += i + 1;
        sumY += data[i];
        sumXY += (i + 1) * data[i];
        sumX2 += Math.pow(i + 1, 2);
    }

    const slope: number = (length * sumXY - sumX * sumY) / (length * sumX2 - Math.pow(sumX, 2));
    const intercept: number = (sumY - slope * sumX) / length;
    const trendLine: number[] = [];
    for (let i = 0; i < length; i++) {
        trendLine.push(slope * (i + 1) + intercept);
    }
    return trendLine;
}

async calculateLogarithmicTrendLine(data: number[]): Promise< number[]>{
    const length: number = data.length;
    let sumXlnY: number = 0;
    let sumlnX: number = 0;
    let sumY: number = 0;
    let sumlnX2: number = 0;

    for (let i = 0; i < length; i++) {
        sumlnX += Math.log(i + 1);
        sumXlnY += Math.log(i + 1) * data[i];
        sumY += data[i];
        sumlnX2 += Math.pow(Math.log(i + 1), 2);
    }

    const CoefAng: number = (length * sumXlnY - sumlnX * sumY) / (length * sumlnX2 - Math.pow(sumlnX, 2));
    const CoefTrendLine: number = (sumY - CoefAng * sumlnX) / length;
    const trendLine: number[] = [];
    for (let i = 0; i < length; i++) {
        trendLine.push(CoefAng * Math.log(i + 1) + CoefTrendLine);
    }
    return trendLine;
}

async sort(dataArray: number[], labelsArray: string[]):Promise< DataLabelPair[] >{   
    const dataWithLabels: DataLabelPair[] = dataArray.map((data, index) => ({
        data,
        label: labelsArray[index]
    }));
   
    dataWithLabels.sort((first, second) => first.data - second.data);  
    for (let i = 0; i < dataWithLabels.length; i++) {
        dataArray[i] = dataWithLabels[i].data;
        labelsArray[i] = dataWithLabels[i].label;
    }
    return dataWithLabels;
}

async unSort(dataArray: number[], labelsArray: string[]):Promise< DataLabelPair[]> { 
    const dataWithLabels: DataLabelPair[] = dataArray.map((data, index) => ({
        data,
        label: labelsArray[index]
    }));
    
    dataWithLabels.sort((first: any, second: any) => first.label - second.label);   
    for (let i = 0; i < dataWithLabels.length; i++) {
        dataArray[i] = dataWithLabels[i].data;
        labelsArray[i] = dataWithLabels[i].label;
    }

    return dataWithLabels;
}

async  calculateAverage(data: number[] | number[][]): Promise< number> {
    if (Array.isArray(data[0])) {    
      const total = (data as number[][]).reduce((acc, array) => acc + array.reduce((subAcc, value) => subAcc + value, 0), 0);
      const count = (data as number[][]).reduce((acc, array) => acc + array.length, 0);
      return total / count;
    } else {     
      return (data as number[]).reduce((acc, value) => acc + value, 0) / data.length;
    }
  }

  async calculateStandardDeviation(data: number[], mean: number): Promise< number> {
    const squaredDifferences: number [] = data.map(value => Math.pow(value - mean, 2));
    const variance: number = await this.calculateAverage(squaredDifferences);
    const standardDeviation: number = Math.sqrt(variance);
    return standardDeviation;
  }

  calculateMedian(data: number[]): number {
    data.sort((a, b) => a - b);
    const length: number = data.length;
    if (length % 2 === 1) {
      return data[Math.floor(length / 2)];
    } else {
      const middleIndex: number = length / 2;
      return (data[middleIndex - 1] + data[middleIndex]) / 2;
    }
  }

  async removeOutliers(data: number[], stdDevThreshold: number):Promise< number[]> {
    const mean: number = await this.calculateAverage(data);
    const stdDev: number =await this.calculateStandardDeviation(data, mean);
    const lowerBound: number = mean - stdDevThreshold * stdDev;
    const upperBound: number = mean + stdDevThreshold * stdDev;
    return data.filter(value => value >= lowerBound && value <= upperBound);
  }

  async  findMaxValue(data: number[][]): Promise< number> {   
    let maxValue = Number.MIN_SAFE_INTEGER;
    for (const row of data) {
      for (const cell of row) {
        maxValue = Math.max(maxValue, cell);
      }
    }

    return maxValue;
  }

  async findMinValue(data: number[][]): Promise< number> {   
    let minValue = Number.MAX_SAFE_INTEGER;
    for (const row of data) {
      for (const cell of row) {
        minValue = Math.min(minValue, cell);
      }
    }

    return minValue;
  }
}
