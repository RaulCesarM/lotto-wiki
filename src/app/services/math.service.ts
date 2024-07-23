import { Injectable } from '@angular/core';
import { DataLabelPair } from '../interfaces/data-label-pair';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() {}

  calculateExponentialTrendLine(data: number[]): number[] {
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



  calculateArithmeticTrendLine(data: number[]): number[] {
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


  calculateLogarithmicTrendLine(data: number[]): number[] {
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


  // sort(dataParam: any, LabelParam: any) {
  //   let data = dataParam;
  //   let labels = LabelParam;
  //   let dataWithLabels = [];
  //   for (let i = 0;i < data.length;i++) {
  //     dataWithLabels.push({
  //       data: data[i],
  //       label: labels[i],
  //     });
  //   }
  //   dataWithLabels.sort((first: any, second: any) => first.data - second.data);
  //   for (let i = 0;i < dataWithLabels.length;i++) {
  //     data[i] = dataWithLabels[i].data;
  //     labels[i] = dataWithLabels[i].label;
  //   }
  //   return dataWithLabels
  // }


sort(dataArray: number[], labelsArray: string[]): DataLabelPair[] {   
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


  // unSort(dataParam: any, LabelParam: any) {
  //   let data = dataParam;
  //   let labels = LabelParam;
  //   let dataWithLabels = [];
  //   for (let i = 0;i < data.length;i++) {
  //     dataWithLabels.push({
  //       data: data[i],
  //       label: labels[i],
  //     });
  //   }
  //   dataWithLabels.sort((first: any, second: any) => first.label - second.label);
  //   for (let i = 0;i < dataWithLabels.length;i++) {
  //     data[i] = dataWithLabels[i].data;
  //     labels[i] = dataWithLabels[i].label;
  //   }
  //   return dataWithLabels
  // }

  unSort(dataArray: number[], labelsArray: string[]): DataLabelPair[] { 
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


  calculateAverage(data: number[]): number {
    return data.reduce((acc, value) => acc + value, 0) / data.length;
  }

  calculateStandardDeviation(data: number[], mean: number): number {
    const squaredDifferences: number [] = data.map(value => Math.pow(value - mean, 2));
    const variance: number = this.calculateAverage(squaredDifferences);
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

  removeOutliers(data: number[], stdDevThreshold: number): number[] {
    const mean: number = this.calculateAverage(data);
    const stdDev: number = this.calculateStandardDeviation(data, mean);
    const lowerBound: number = mean - stdDevThreshold * stdDev;
    const upperBound: number = mean + stdDevThreshold * stdDev;
    return data.filter(value => value >= lowerBound && value <= upperBound);
  }
}
