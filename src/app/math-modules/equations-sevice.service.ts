import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquationsSeviceService {

  constructor() { }


   calculateExponentialTrendLine(data: number[]) {
  //  this.isCalcularLinhaTendencia = true;
    const trendLine = [];
    const a = data[0]; 
    const b = Math.log(data[data.length - 1] / a) / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
      trendLine.push(a * Math.exp(b * i));
    }
    return trendLine;
  }

  calculateArithmeticTrendLine(data: number[]) {
  //   this.isCalcularLinhaTendencia = true;
  //   const trendLine = [];
  //   const slope = (data[data.length - 1] - data[0]) / (data.length - 1);
  //   for (let i = 0; i < data.length; i++) {
  //     trendLine.push(data[0] + slope * i);
  //   }
  //   return trendLine;
  }

  calculateLogarirmicTrendLine(data: number[]){

  }

  sortUp() {
    // const data = this.chart.data.datasets[0].data;
    // const labels = this.chart.data.labels;
    // const dataWithLabels = [];
    // for (let i = 0; i < data.length; i++) {
    //   dataWithLabels.push({
    //     data: data[i],
    //     label: labels[i],
    //   });
    }

     removeAverage() {
      // this.chart.data.datasets[1].data = [];
      // this.chart.update();
    }

    addAverage() {
      // const data = this.chart.data.datasets[0].data;
      // const media = this.calcularMedia(data);
      // this.chart.data.datasets[1].data = Array(data.length).fill(media);
      // this.chart.update();
    }

    removeAvarege(){

    }

    calaculateAvarege(data: number[]) {
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

    

  private zScore(){
    // estudar algoritmos de z-core
  }
















}
