import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import Chart from 'chart.js/auto';
import { KatexService } from 'src/app/katex-module/katex.service';
import { EquationsSeviceService } from 'src/app/math-modules/equations-sevice.service';
import { RankingService } from 'src/app/services-module/ranking.service';

@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit {
  @ViewChild('exampleModal')
  exampleModal!: ElementRef;

  title = 'ng-chart';
  chart: any = [];

  

  bar: string = '#37A9F5';
  bordeBar: string = '#37A9F5';

  barRGBA: string ='';
  borderRGBA: string ='';

  tipoGraficoSelecionado: string = '';

  isSorted: boolean = false;
  isAvaregeShow: boolean = false;
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;
  isLogarithmLineDataTrendLineShow: boolean = false;

  isHaveyActive = false;
  isLightActive = false;
  isRepeatedActive = false;
  isBaseActive = false;


  showGaussianChart: boolean = false;

  isOutliersShow: boolean = true;

  originalData: any[] | undefined;
  originalLabels: any[] | undefined;
  originalDataSource: number[] | undefined;
  outliersData: number[] | undefined;



  constructor(
    private elRef: ElementRef,
    private katexService: KatexService,
    private mathService: EquationsSeviceService,
    private rankingService: RankingService
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
    this.katexService.renderMathExpression(tendencyExpression,'linhaTendenciaFormula');

    this.bar = localStorage.getItem('bar') || this.bar;
    this.bordeBar = localStorage.getItem('bordeBar') || this.bordeBar;

    this.isBaseActive = true;
    this.originalDataSource = [...this.rankingService.baseDataSource];


    this.barRGBA = this.hexToRGBA(this.bar, 0.5)
    this.borderRGBA = this.hexToRGBA(this.bar, 0.5)

    this.showChart();

    const myModal = new bootstrap.Modal(this.exampleModal.nativeElement);
    myModal.show();

  }

 
  saveConfig() {
    localStorage.setItem('bar', this.bar);
    localStorage.setItem('bordeBar', this.bordeBar);  
      this.chart.data.datasets[0].backgroundColor = this.hexToRGBA(this.bar, 0.5);  
      this.chart.data.datasets[0].borderColor =  this.hexToRGBA(this.bordeBar, 0.5); 
      this.chart.data.datasets[0].type = this.tipoGraficoSelecionado;   
      this.chart.update();
  }

  hexToRGBA(hexValue: string, opacity: number): string {
    const hex = hexValue.replace('#', '');
    const rgbValues = hex.match(/.{1,2}/g)?.map(val => parseInt(val, 16)) ?? [];
    rgbValues.push(opacity);
    return `rgba(${rgbValues.join(',')})`;
  }


  // rgbaToHex(rgbaValue: string): string {
    
  //   const rgbaMatch = rgbaValue.match(/(\d{1,3}),(\d{1,3}),(\d{1,3}),([\d.]+)/);
  //   if (!rgbaMatch) {
  //     throw new Error('Valor RGBA inválido.');
  //   }
  //   const [, r, g, b, a] = rgbaMatch.map(Number);  
   
  //   const rHex = r.toString(16).padStart(2, '0');
  //   const gHex = g.toString(16).padStart(2, '0');
  //   const bHex = b.toString(16).padStart(2, '0');
  
   
  //   if (a === 1) {
  //     return `#${rHex}${gHex}${bHex}`;
  //   }
  
    
  //   const aHex = Math.round(a * 255).toString(16).padStart(2, '0');
  //   return `#${rHex}${gHex}${bHex}${aHex}`;
  // }
  



  showChart() {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...this.rankingService.labelsDataSource],
        datasets: [
          {
            label: 'Normal',
            data: this.originalDataSource,
            backgroundColor:this.barRGBA,
            borderColor: this.borderRGBA,
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
            label: 'Linha de Tendência Exponencial',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'blue',
            pointRadius: 2,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Aritmetica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'RGB(11, 222, 99)',
            pointRadius: 1,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Logaritmica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'RGB(12, 131, 133)',
            pointRadius: 1,
            borderWidth: 1,
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

    this.originalData = JSON.parse(JSON.stringify(this.chart.data.datasets[0].data));
    this.originalLabels = JSON.parse( JSON.stringify([...this.chart.data.labels]));
  }

  /////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////

  updateDataSourceBasedOnEvent(event: string) {

    if (event === 'heavy') {
      this.isHaveyActive = true;
      this.isLightActive = false;
      this.isRepeatedActive = false;
      this.isBaseActive = false;
      this.originalDataSource = [...this.rankingService.heavyDataSource];
    }
    if (event === 'light') {
      this.isLightActive = true;
      this.isHaveyActive = false;
      this.isRepeatedActive = false;
      this.isBaseActive = false;
      this.originalDataSource = [...this.rankingService.lightDataSource];
    }
    if (event === 'repeated') {
      this.isRepeatedActive = true;
      this.isLightActive = false;
      this.isHaveyActive = false;
      this.isBaseActive = false;
      this.originalDataSource = [...this.rankingService.reiterationDataSource];
    }
    if (event === 'base') {
      this.isBaseActive = true;
      this.isRepeatedActive = false;
      this.isLightActive = false;
      this.isHaveyActive = false;
      this.originalDataSource = [...this.rankingService.baseDataSource];
    }

    this.chart.data.datasets[0].data = this.originalDataSource;
    this.mostrarOriginal()
    this.updateChartAndTrendLines()
    this.chart.update();
  }

  toggleOrdenado() {
    this.isSorted = !this.isSorted;
    if (this.isSorted) {
      this.ordenar();
    } else {
      this.mostrarOriginal();
    }
  }

  ordenar() {
    let data = this.chart.data.datasets[0].data;
    const labels = this.chart.data.labels;
    let dataWithLabels = this.mathService.sort(data, labels);
    this.updateChartAndTrendLines()
    this.chart.update();
  }


  mostrarOriginal() {

    let data = this.chart.data.datasets[0].data;
    const labels = this.chart.data.labels;
    let dataWithLabels = this.mathService.unSort(data, labels);
   this.updateChartAndTrendLines();
   this.chart.update();
  }

  updateChartAndTrendLines() {

    if (this.isExponentialTrendLineShow) {
      this.adicionarLinhaTendenciaExponencial();
    }else{
      this.removerLinhaTendenciaExponencial();
    }


    if (this.isArithmeticTrendLineShow) {
      this.adicionarLinhaTendenciaAritmetica();
    }else{
      this.removerLinhaTendenciaAritmetica();
    }

    if (this.isLogarithmLineDataTrendLineShow) {
      this.adicionarLinhaTendenciaLogarithm();
    } else {
      this.removerLinhaTendenciaLogarithm()
    }

    if (this.isAvaregeShow) {
      this.adicionarMedia();
    } else {
      this.removerMedia()
    }
  }

  toggleOutliers() {
    this.isOutliersShow = !this.isOutliersShow;
    if (this.isOutliersShow) {
      this.sortOutlier();
    } else {
      this.removeOutliers();
    }
  }

  removeOutliers() {
    const originalData: number[] = this.originalData || [];
    const dataWithOutliers = this.mathService.removeOutliers(originalData, 1.5);
    this.chart.data.datasets[0].data = dataWithOutliers;
    this.outliersData = dataWithOutliers;
    this.chart.update();
  }

  sortOutlier() {
    const data = this.outliersData;
    const labels = this.chart.data.labels;
    const dataWithLabels = this.mathService.sort(data, labels);
    this.chart.data.datasets[0].data = dataWithLabels.map(
      (item: any) => item.data
    );
    this.chart.data.labels = dataWithLabels.map((item: any) => item.label);

    this.updateChartAndTrendLines()
  }


  toggleTendenciaArithmetic() {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaAritmetica() {
    const data = this.chart.data.datasets[0].data;
    this.isArithmeticTrendLineShow = true;
    const trendLineData = this.mathService.calculateArithmeticTrendLine(data);
    this.chart.data.datasets[3].data = trendLineData;
    this.chart.update();
  }

  private removerLinhaTendenciaAritmetica() {
    this.isArithmeticTrendLineShow = false;
    this.chart.data.datasets[3].data = [];
    this.chart.update();
  }

  ////////////////////////////////////////////////////////////////////

  toggleTendenciaExponencial() {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaExponencial() {
    const data = this.chart.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData = this.mathService.calculateExponentialTrendLine(data);
    this.chart.data.datasets[2].data = trendExponetialLineData;
    this.chart.update();
  }

  private removerLinhaTendenciaExponencial() {
    this.isExponentialTrendLineShow = false;
    this.chart.data.datasets[2].data = [];
    this.chart.update();
  }

  ////////////////////////////////////////////////////////////

  toggleTendenciaLogarithm() {
    this.isLogarithmLineDataTrendLineShow = !this.isLogarithmLineDataTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaLogarithm() {
    const data = this.chart.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true; ///
    const trendLogarithmLineData = this.mathService.calculateLogarirmicTrendLine(data);
    this.chart.data.datasets[4].data = trendLogarithmLineData;
    this.chart.update();
  }

  private removerLinhaTendenciaLogarithm() {
    this.isLogarithmLineDataTrendLineShow = false;
    this.chart.data.datasets[4].data = [];
    this.chart.update();
  }

  ///////////////////////////////////////////////////

  toggleMedia() {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.updateChartAndTrendLines()
  }

  private adicionarMedia() {
    const data = this.chart.data.datasets[0].data;
    const media = this.mathService.calculateAverage(data);
    this.chart.data.datasets[1].data = Array(data.length).fill(media);
    this.chart.update();
  }

  private removerMedia() {
    this.chart.data.datasets[1].data = [];
    this.chart.update();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
