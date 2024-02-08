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







  calculateArithmeticTrendLine(data: number[]) { 
    const trendLine = [];
    const slope = (data[data.length - 1] - data[0]) / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
      trendLine.push(data[0] + slope * i);
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


    calculateAvarege(data: number[]) {
      return data.reduce((acc, value) => acc + value, 0) / data.length;
    }


    private removeOutLier(data: number []){
      // this.showOutliers = !this.showOutliers;
      // let initialData: number[];
      // let media: number;
      // let mediana: number;
      // let maior: number;
      // let segundoMaior:number; 
  
  
      
    }

    
















}
