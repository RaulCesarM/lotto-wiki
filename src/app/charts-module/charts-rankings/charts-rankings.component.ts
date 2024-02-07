import {  Component,  ElementRef,  OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { KatexService } from 'src/app/katex-module/katex.service';

@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit{

  title = 'ng-chart';
  chart: any = [];
  isOrdenado: boolean = false;
  isMediaVisible: boolean = false;
  isTendenciaVisible: boolean = false;
  isCalcularLinhaTendencia: boolean = false;
  originalData: any[] | undefined;
  originalLabels: any[] | undefined;

  showOutliers: boolean = true;

  constructor(
    private elRef: ElementRef,
    private katexService : KatexService,

    ) {}

  ngAfterViewInit() {


    const canvas = this.elRef.nativeElement.querySelector(
      '#canvas'
    ) as HTMLCanvasElement;
    if (canvas && canvas.parentElement) {
      canvas.width = canvas.parentElement.clientWidth;
    }
  }
  ngOnInit() {

    const mediaExpression = this.katexService.getSimpleArithmethicMeanFormula();
    const tendencyExpression = this.katexService.getExponentialTrendLineFormula();
    this.katexService.renderMathExpression(mediaExpression, 'media');
    this.katexService.renderMathExpression(tendencyExpression, 'linhaTendenciaFormula');



    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['1','2', '3','4','5','6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22', '23','24','25',
        ],
        datasets: [
          {
            label: 'Normal',
            data: [
              12, 19, 43, 5, 2, 3, 19, 31, 5, 21, 13, 19, 3, 5, 12, 23, 19, 23,52, 2, 23, 19, 33, 25, 8,
            ],
            backgroundColor:  'rgba(55, 169, 245,0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Média',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'red',
            pointRadius: 1,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'orange',
            pointRadius: 2,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            offset: true,
            grid: {
              display: true,
            },
          },
          y: {
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
    this.originalData = JSON.parse(
      JSON.stringify(this.chart.data.datasets[0].data)
    );
    this.originalLabels = JSON.parse(JSON.stringify(this.chart.data.labels));
  }
  toggleOrdenado() {
    this.isOrdenado = !this.isOrdenado;
    if (this.isOrdenado) {
      this.ordenar();
    } else {
      this.mostrarOriginal();
    }
  }
  toggleMedia() {
    this.isMediaVisible = !this.isMediaVisible;
    if (this.isMediaVisible) {
      this.adicionarMedia();
    } else {
      this.removerMedia();
    }
    this.chart.update();
  }
  toggleTendencia() {
    this.isTendenciaVisible = !this.isTendenciaVisible;
    if (this.isTendenciaVisible) {
      this.adicionarLinhaTendencia();
    } else {
      this.removerLinhaTendencia();
    }
    this.chart.update();
  }
  ordenar() {
    const data = this.chart.data.datasets[0].data;
    const labels = this.chart.data.labels;
    const dataWithLabels = [];
    for (let i = 0; i < data.length; i++) {
      dataWithLabels.push({
        data: data[i],
        label: labels[i],
      });
    }
    dataWithLabels.sort((a, b) => a.data - b.data);
    for (let i = 0; i < dataWithLabels.length; i++) {
      data[i] = dataWithLabels[i].data;
      labels[i] = dataWithLabels[i].label;
    }
    this.chart.update();
    if (this.isCalcularLinhaTendencia === true) {
      this.adicionarLinhaTendencia();
    }
  }
  mostrarOriginal() {
    this.chart.data.datasets[0].data = JSON.parse(
      JSON.stringify(this.originalData)
    );
    this.chart.data.labels = JSON.parse(JSON.stringify(this.originalLabels));
    if (this.isCalcularLinhaTendencia === true) {
      this.adicionarLinhaTendencia();
      this.chart.update();
    }
    this.chart.update();
  }
  private adicionarLinhaTendencia() {
    if (this.isOrdenado === true) {
      this.chart.update();
    }
    const data = this.chart.data.datasets[0].data;
    const trendLineData = this.calcularLinhaTendencia(data);
    this.chart.data.datasets[2].data = trendLineData;
    this.chart.update();
  }
  private removerLinhaTendencia() {
    this.isCalcularLinhaTendencia = false;
    this.chart.data.datasets[2].data = [];
    this.chart.update();
  }

  // ja no serviço
  private adicionarMedia() {
    const data = this.chart.data.datasets[0].data;
    const media = this.calcularMedia(data);
    this.chart.data.datasets[1].data = Array(data.length).fill(media);
    this.chart.update();
  }
  // ja no serviço
  private removerMedia() {
    this.chart.data.datasets[1].data = [];
    this.chart.update();
  }

 // ja no serviço
  private calcularLinhaTendencia(data: number[]) {
    this.isCalcularLinhaTendencia = true;
    const trendLine = [];
    const a = data[0]; // coeficiente inicial
    const b = Math.log(data[data.length - 1] / a) / (data.length - 1);
    for (let i = 0; i < data.length; i++) {
      trendLine.push(a * Math.exp(b * i));
    }
    return trendLine;
  }
 
   // ja no serviço
  private calcularMedia(data: number[]) {
    return data.reduce((acc, value) => acc + value, 0) / data.length;
  }
}
