import { Component, OnInit } from '@angular/core';
import { CorrelationsService } from 'src/app/services/correlations.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-correlations',
  templateUrl: './correlations.component.html',
  styleUrls: ['./correlations.component.css'],

})
export class CorrelationsComponent implements OnInit {

  colors: string[] = ['rgb(255, 165, 165)', 'rgb(255, 255, 0)', 'rgb(126, 218, 249)', 'rgb(255, 255, 255)'];
  avarege: number = 0;
  max: number = 0;
  min: number = 0;
  headers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  footers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  indexRow: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  cells: number[][] = [];

  constructor(
    private correlationsService: CorrelationsService,
    private mathService: MathService) {}

  async ngOnInit() {
    await this.loadCellsData();
  }

  async loadCellsData(): Promise<void> {
    this.cells = await this.correlationsService.getData();
    this.avarege = await this.mathService.calculateAverage(this.cells);
    this.max = await this.mathService.findMaxValue(this.cells);
    this.min = await this.mathService.findMinValue(this.cells);
  }

  getCellColor(cellNumber: number): string {
    const max: number = this.max;
    const min: number = this.min;
    if (cellNumber === max) {
      return this.colors[0];
    } else if (cellNumber === min) {
      return this.colors[1];
    } else {
      return cellNumber > this.avarege ? this.colors[2] : this.colors[3];
    }
  }
}
