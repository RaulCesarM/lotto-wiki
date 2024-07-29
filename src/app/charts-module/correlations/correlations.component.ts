import { Component, OnInit } from '@angular/core';
import { CorrelationsService } from 'src/app/services/correlations.service';
import { KatexService } from 'src/app/services/katex.service';

@Component({
  selector: 'app-correlations',
  templateUrl: './correlations.component.html',
  styleUrls: ['./correlations.component.css']
})
export class CorrelationsComponent implements OnInit {

  colors: string[][] = [];
  avarege: number =0;
  max: number =0;
  biggerAvarege: number =0;
  min: number =0;

  numero:  any | object | null | undefined;
  headers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  footers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  indexRow: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
 cells: number[][] = [];

  constructor(
     private correlationsService: CorrelationsService,
     private katexService : KatexService) { }

 async ngOnInit() { 
    await this.correlationsService.loadData()
    this.loadCellsData()
    this.calculateAverage();
    this.getMax();
    this.getMin();
    const correlationExpression = this.katexService.getCorrelationFormula();
    this.katexService.renderMathExpression(correlationExpression, 'correlation');
  }

  loadCellsData() {
   this.cells = this.correlationsService.matrix;  
  }

  calculateAverage(): void {
    this.avarege = this.correlationsService.calculateAverage();
  }

  getMax(): void {
    this.max = this.correlationsService.findMaxValue();
  }

  getMin(): void {
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
      return cellNumber > this.avarege ? 'rgb(126, 218, 249)' : 'rgb(255, 255, 255)' ;
    }

  }
}
