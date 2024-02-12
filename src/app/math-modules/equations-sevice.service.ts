import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquationsSeviceService {

  constructor() { }

   calculateExponentialTrendLine(data: number[]):number [] {
    const trendLine = [];
    const a = data[0]; 
    const b = Math.log(data[data.length - 1] / a) / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
      trendLine.push(a * Math.exp(b * i));
    }
    return trendLine;
  }

  calculateArithmeticTrendLine(data: number[]): number[] { 
    const trendLine = [];
    let media = 0;
 
    for (let i = 0; i < data.length; i++) {
      media = media + data[i]      
    }
    media = (media / data.length)
    for (let i = 0; i < data.length; i++) { 
     
    
      trendLine.push(data[i] / i* media );
    }
    return trendLine;
  }

  calculateLogarirmicTrendLine(data: number[]){

  }

  sort( dataParam: any, LabelParam: any) {
    let data = dataParam ;
    let labels = LabelParam;
    let dataWithLabels = [] ;
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


    calculateAverage(data: number[]) {
      return data.reduce((acc, value) => acc + value, 0) / data.length;
    }


    private removeOutLier(data: number []){
      const outliersRemoved = [];
    
      // Calcular a média
      let sum = 0;
      for (let i = 0; i < data.length; i++) {
          sum += data[i];
      }
      const mean = sum / data.length;
  
      // Calcular o desvio padrão
      let variance = 0;
      for (let i = 0; i < data.length; i++) {
          variance += Math.pow(data[i] - mean, 2);
      }
      const stdDev = Math.sqrt(variance / data.length);
  
      // Remover outliers
      const threshold = 2; // Limiar de 2 desvios padrão
      for (let i = 0; i < data.length; i++) {
          if (Math.abs(data[i] - mean) <= threshold * stdDev) {
              outliersRemoved.push(data[i]);
          }
      }
  
      return outliersRemoved;
  
  
      
    }

    
















}
