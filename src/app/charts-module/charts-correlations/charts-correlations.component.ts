import { Component, Renderer2 } from '@angular/core';
import { CorrelationsServiceService } from 'src/app/services-module/correlations-service.service';
import { ColorEvent } from 'ngx-color';


@Component({
  selector: 'app-charts-correlations',
  templateUrl: './charts-correlations.component.html',
  styleUrls: ['./charts-correlations.component.css']
})
export class ChartsCorrelationsComponent {


  correl: string = `\text{Correlação: } r = \frac{n(\sum xy) - (\sum x)(\sum y)}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}`;
  cores: string[][] = [];
  media: number =0;
  max: number =0;
  min: number =0;

  numero:  any | object | null | undefined;
  headers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  footers: number[] = Array.from({ length: 25 }, (_, index) => index + 1);
  indexRow: number[] = Array.from({ length: 25 }, (_, index) => index + 1);

  //cells: number[] = this.generateRandomArray(25);
  cells: number[][] = this.correlationsService.getData();

  constructor(
    private renderer: Renderer2,
     private correlationsService: CorrelationsServiceService
     ) {}

  ngOnInit(){
    this.calcularMedia();
    this.calcularMax();
    this.calcularMin();

  }

  private generateRandomArray(length: number): number[] {
    const uniqueNumbers = new Set<number>();
    while (uniqueNumbers.size < length) {
      uniqueNumbers.add(Math.floor(Math.random() * 100) + 1);
    }
    return Array.from(uniqueNumbers);
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

    // Adicione a lógica para verificar se o valor é igual ao máximo ou mínimo
    if (cellNumber === max) {
      return 'rgb(255, 0, 0)';
    } else if (cellNumber === min) {
      return 'rgb(255, 255, 0)';
    } else {
      // Adicione sua lógica existente para verificar se o valor é maior que a média
      return cellNumber > this.media ? 'rgb(126, 218, 249)' : 'rgb(255, 255, 255)' ;
    }


  }








}
