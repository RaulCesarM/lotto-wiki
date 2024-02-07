import { Component, OnInit } from '@angular/core';

import { KatexService } from 'src/app/katex-module/katex.service';
import { CorrelationsServiceService } from 'src/app/services-module/correlations-service.service';



@Component({
  selector: 'app-charts-correlations',
  templateUrl: './charts-correlations.component.html',
  styleUrls: ['./charts-correlations.component.css']
})
export class ChartsCorrelationsComponent implements OnInit {

  cores: string[][] = [];
  media: number =0;
  max: number =0;
  min: number =0;

  numero:  any | object | null | undefined;
  headers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  footers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  indexRow: number[] = Array.from({ length: 25 }, (_, index) => index + 1);


  cells: number[][] = this.correlationsService.getData();

  constructor(
     private correlationsService: CorrelationsServiceService,
     private katexService : KatexService,

     ) {  }

  ngOnInit(){
    this.calcularMedia();
    this.calcularMax();
    this.calcularMin();
    const correlationExpression = this.katexService.getCorrelationFormula();
    this.katexService.renderMathExpression(correlationExpression, 'correlation');

  }


  calcularMedia(): void {
    this.media = this.correlationsService.calculateAverage();

  }

  calcularMax(): void {
    this.max = this.correlationsService.findMaxValue();

  }

  calcularMin(): void {
    this.min = this.correlationsService.findMinValue();

  }


  getCellColor(cellNumber: number): string {
    const max = this.max;
    const min = this.min;


    if (cellNumber === max) {
      return 'rgb(255, 165, 165)';
    } else if (cellNumber === min) {
      return 'rgb(255, 255, 0)';
    } else {

      return cellNumber > this.media ? 'rgb(126, 218, 249)' : 'rgb(255, 255, 255)' ;
    }

  }

}
