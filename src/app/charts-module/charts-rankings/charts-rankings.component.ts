import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import Chart from 'chart.js/auto';
import { KatexService } from 'src/app/services/katex.service';
import { EquationsService } from 'src/app/services/equations.service';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit {
  @ViewChild('exampleModal')
  exampleModal!: ElementRef;



  mainBarToRGBA: string ='';
  mainBorderToRGBA: string ='';

  /////////////////////////////////////////////////

  rankingChartBarColor: string='#fc08f4';
  rankingChartBorderBarColor: string ='#fc08f4';
  rankingTypeChart: string ='bar'



  powerTrendLineColor:string ='#fc08f4';
  powerTrendLineWidth: number = 1;

  LinearTrendLineColor: string = '#fca708'
  linearTrendLineWidth:number =1
  
  logarithmicTrendLineColor: string ='#fc08f4';
  logarithmicTrendLineWidth:number =1;

  exponentialTrendLineColor: string ='#08fcc7';
  exponentialTrendLineWidth:number =1;



  outlierDeviantMaximumValue:number =5;

  meanAritmethicColor: string ='#0810fc';
  meanAritmethicWidth: number =1;
























  title = 'ng-chart';
  chartRanking: any = [];  

  isSorted: boolean = false;
  isAvaregeShow: boolean = false;
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;
  isLogarithmLineDataTrendLineShow: boolean = false;

  isHaveyActive = false;
  isLightActive = false;
  isRepeatedActive = false;
  isBaseActive = false;
  
  isOutliersShow: boolean = true;

  originalData: any[] | undefined;
  originalLabels: any[] | undefined;
  originalDataSource: number[] | undefined;
  outliersData: number[] | undefined;

  constructor(
    private elRef: ElementRef,
    private katexService: KatexService,
    private mathService: EquationsService,
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


  getValuesLocalStorage() {


    this.rankingChartBarColor = localStorage.getItem('rankingChartBarColor') || this.rankingChartBarColor;
    this.rankingChartBorderBarColor = localStorage.getItem('rankingChartBorderBarColor') || this.rankingChartBorderBarColor;
    this.rankingTypeChart = localStorage.getItem('rankingTypeChart') || this.rankingTypeChart;


    this.powerTrendLineColor = localStorage.getItem('trendLinePowerColor') || this.powerTrendLineColor;   
    this.LinearTrendLineColor = localStorage.getItem('trendLineLinearColor') || this.LinearTrendLineColor;
    this.logarithmicTrendLineColor = localStorage.getItem('logarithmicTrendLineColor') || this.logarithmicTrendLineColor;
    this.exponentialTrendLineColor = localStorage.getItem('exponentialTrendLineColor') || this.exponentialTrendLineColor;   
    this.meanAritmethicColor = localStorage.getItem('meanAritmethicColor') || this.meanAritmethicColor;


    const powerTrendLineWidthString = localStorage.getItem('powerTrendLineWidth');
    this.powerTrendLineWidth = powerTrendLineWidthString !== null ? parseInt(powerTrendLineWidthString) : this.powerTrendLineWidth;

    const linearTrendLineWidthString = localStorage.getItem('linearTrendLineWidth');
    this.linearTrendLineWidth = linearTrendLineWidthString !== null ? parseInt(linearTrendLineWidthString) : this.linearTrendLineWidth;


    const logarithmicTrendLineWidthString = localStorage.getItem('logarithmicTrendLineWidth');
    this.logarithmicTrendLineWidth = logarithmicTrendLineWidthString !== null ? parseInt(logarithmicTrendLineWidthString) : this.logarithmicTrendLineWidth;

    const exponentialTrendLineWidthString = localStorage.getItem('exponentialTrendLineWidth');
    this.exponentialTrendLineWidth = exponentialTrendLineWidthString !== null ? parseInt(exponentialTrendLineWidthString) : this.exponentialTrendLineWidth;
    
    const meanAritmethicWidthString = localStorage.getItem('meanAritmethicWidth');
    this.meanAritmethicWidth = meanAritmethicWidthString !== null ? parseInt(meanAritmethicWidthString) : this.meanAritmethicWidth;
}



  ngOnInit() {


    this. getValuesLocalStorage()

    const mediaExpression = this.katexService.getSimpleArithmethicMeanFormula();
    const tendencyExpression = this.katexService.getExponentialTrendLineFormula();

    this.katexService.renderMathExpression(mediaExpression, 'media');
    this.katexService.renderMathExpression(tendencyExpression,'linhaTendenciaFormula');

    this.isBaseActive = true;
    this.originalDataSource = [...this.rankingService.baseDataSource];
   
    this.showChart();

    const myModal = new bootstrap.Modal(this.exampleModal.nativeElement);
    myModal.show();

  }

 

  showChart() {
    this.chartRanking = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...this.rankingService.labelsDataSource],
        datasets: [
          {
            label: 'Normal',
            data: this.originalDataSource,
            backgroundColor:this.rankingChartBarColor,
            borderColor: this.rankingChartBorderBarColor,
            borderWidth: 1,
          },
          {
            label: 'Média',
            data: [],
            type: 'line',
            fill: false,
            borderColor: this.meanAritmethicColor,
            pointRadius: this.meanAritmethicWidth,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Exponencial',
            data: [],
            type: 'line',
            fill: false,
            borderColor: this.exponentialTrendLineColor,
            pointRadius: this.exponentialTrendLineWidth,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Aritmetica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: this.LinearTrendLineColor,
            pointRadius: this.linearTrendLineWidth,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Logaritmica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: this.logarithmicTrendLineColor,
            pointRadius: this.linearTrendLineWidth,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false,
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

    this.originalData = JSON.parse(JSON.stringify(this.chartRanking.data.datasets[0].data));
    this.originalLabels = JSON.parse( JSON.stringify([...this.chartRanking.data.labels]));
  }

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

    this.chartRanking.data.datasets[0].data = this.originalDataSource;
    this.mostrarOriginal()
    this.updateChartAndTrendLines()
    this.chartRanking.update();
  }

  //////////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////////////
  toggleOutliers() {
    this.isOutliersShow = !this.isOutliersShow;
    if (this.isOutliersShow) {
      this.adicionaOutliers();
    } else {
      this.removeOutliers();
    }
  }

  removeOutliers() {
    const originalData: number[] = this.originalData || [];
    const dataWithOutliers = this.mathService.removeOutliers(originalData, 1.0);
    this.chartRanking.data.datasets[0].data = dataWithOutliers;
    this.outliersData = dataWithOutliers;
    this.chartRanking.update();
  } 

  adicionaOutliers(){
    this.chartRanking.data.datasets[0].data = this.originalData;   
   this.updateChartAndTrendLines();
   this.chartRanking.update();

  }

  ///////////////////////////////////////////////////////////////////////////////

  toggleTendenciaArithmetic() {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaAritmetica() {
    const data = this.chartRanking.data.datasets[0].data;
    this.isArithmeticTrendLineShow = true;
    const trendLineData = this.mathService.calculateArithmeticTrendLine(data);
    this.chartRanking.data.datasets[3].data = trendLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaAritmetica() {
    this.isArithmeticTrendLineShow = false;
    this.chartRanking.data.datasets[3].data = [];
    this.chartRanking.update();
  }

  //////////////////////////////////////////////////////////////////
  toggleOrdenado() {
    this.isSorted = !this.isSorted;
    if (this.isSorted) {
      this.ordenar();
    } else {
      this.mostrarOriginal();
    }
  }

  ordenar() {
    let data = this.chartRanking.data.datasets[0].data;
    const labels = this.chartRanking.data.labels;
    let dataWithLabels = this.mathService.sort(data, labels);
    this.updateChartAndTrendLines()
    this.chartRanking.update();
  }

  mostrarOriginal() {

    let data = this.chartRanking.data.datasets[0].data;
    const labels = this.chartRanking.data.labels;
    let dataWithLabels = this.mathService.unSort(data, labels);
   this.updateChartAndTrendLines();
   this.chartRanking.update();
  }

  ////////////////////////////////////////////////////////////////////

  toggleTendenciaExponencial() {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaExponencial() {
    const data = this.chartRanking.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData = this.mathService.calculateExponentialTrendLine(data);
    this.chartRanking.data.datasets[2].data = trendExponetialLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaExponencial() {
    this.isExponentialTrendLineShow = false;
    this.chartRanking.data.datasets[2].data = [];
    this.chartRanking.update();
  }

  ////////////////////////////////////////////////////////////

  toggleTendenciaLogarithm() {
    this.isLogarithmLineDataTrendLineShow = !this.isLogarithmLineDataTrendLineShow;
    this.updateChartAndTrendLines()
  }

  private adicionarLinhaTendenciaLogarithm() {
    const data = this.chartRanking.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true; ///
    const trendLogarithmLineData = this.mathService.calculateLogarirmicTrendLine(data);
    this.chartRanking.data.datasets[4].data = trendLogarithmLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaLogarithm() {
    this.isLogarithmLineDataTrendLineShow = false;
    this.chartRanking.data.datasets[4].data = [];
    this.chartRanking.update();
  }

  ///////////////////////////////////////////////////

  toggleMedia() {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.updateChartAndTrendLines()
  }

  private adicionarMedia() {
    const data = this.chartRanking.data.datasets[0].data;
    const media = this.mathService.calculateAverage(data);
    this.chartRanking.data.datasets[1].data = Array(data.length).fill(media);
    this.chartRanking.update();
  }

  private removerMedia() {
    this.chartRanking.data.datasets[1].data = [];
    this.chartRanking.update();
  }

  ngOnDestroy() {
    if (this.chartRanking) {
      this.chartRanking.destroy();
    }
  }
}
