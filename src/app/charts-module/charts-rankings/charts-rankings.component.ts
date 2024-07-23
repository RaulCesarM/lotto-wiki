import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
import { KatexService } from 'src/app/services/katex.service';
import { MathService } from 'src/app/services/math.service';
import { RankingService } from 'src/app/services/ranking.service';


@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit {
  @ViewChild('exampleModal')
  exampleModal!: ElementRef;

  typeChart: string = 'bar';

  title = 'ng-chart';
  chartRanking: any = [];

  isSorted: boolean = false;
  isAvaregeShow: boolean = false;
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;
  isLogarithmLineDataTrendLineShow: boolean = false;


  isFormulaShow: boolean = false


  isHaveyActive: boolean = false;
  isLightActive: boolean = false;
  isRepeatedActive: boolean = false;
  isBaseActive: boolean = true;

  isOutliersShow: boolean = true;

  originalData: any[] | undefined;
  originalLabels: any[] | undefined;
  originalDataSource: number[] | undefined;
  outliersData: number[] | undefined;

  constructor(
    private elRef: ElementRef,
    private katexService: KatexService,
    private mathService: MathService,
    private rankingService: RankingService
  ) {}

  avaregeExpression: string = '';
  exponetialTrendLineExpression: string = '';
  arithmeticTrendLineExpression: string = '';
  logaritmicTrendLineExpression: string = '';

  outlierInputValue: number = 5

  setOutLierInput(): void {
    if (!this.isOutliersShow && this.isFormulaShow) {
      const expression: string = `\\text{Outlier} = ${this.outlierInputValue.toString()}`;
      this.katexService.renderMathExpression(expression, 'outlierKatex');
    } else {
      this.katexService.renderMathExpression('', 'outlierKatex');
    }
  }



  ngOnInit() {
    this.isBaseActive = true;
    this.originalDataSource = [...this.rankingService.baseDataSource];
    this.showChart();
  }

  setLogarithmicTrenLineExpression(): void {
    if (this.isLogarithmLineDataTrendLineShow && this.isFormulaShow) {
      this.logaritmicTrendLineExpression = this.katexService.getLogarithmicTrendLineFormula();
      this.katexService.renderMathExpression(this.logaritmicTrendLineExpression, 'linhaDeTendenciaLogaritmica');
    } else {
      this.logaritmicTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaLogaritmica');
    }
  }

  setAritmeticTrenLineExpression(): void {
    if (this.isArithmeticTrendLineShow && this.isFormulaShow) {
      this.arithmeticTrendLineExpression = this.katexService.getArithmeticTrendLineFormula();
      this.katexService.renderMathExpression(this.arithmeticTrendLineExpression, 'linhaDeTendenciaAritimetica');
    } else {
      this.arithmeticTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaAritimetica');
    }
  }

  setExponentialTrenLineExpression(): void {
    if (this.isExponentialTrendLineShow && this.isFormulaShow) {
      this.exponetialTrendLineExpression = this.katexService.getExponentialTrendLineFormula();
      this.katexService.renderMathExpression(this.exponetialTrendLineExpression, 'linhaTendenciaFormula');
    } else {
      this.exponetialTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaTendenciaFormula');
    }
  }

  setAvaregeExpression(): void {
    if (this.isAvaregeShow && this.isFormulaShow) {
      this.avaregeExpression = this.katexService.getSimpleArithmethicMeanFormula();
      this.katexService.renderMathExpression(this.avaregeExpression, 'media');
    } else {
      this.avaregeExpression = '';
      this.katexService.renderMathExpression('', 'media');
    }
  }

  saveType(selectedValue: string): void {
    this.chartRanking.config.type = selectedValue;
    (this.chartRanking as Chart).update();
  }

  showChart(type?: string) {
    this.chartRanking = new Chart('canvas', {
      type: (type as keyof ChartTypeRegistry) || 'bar',
      data: {
        labels: [...this.rankingService.labelsDataSource],
        datasets: [
          {
            label: 'Normal',
            data: this.originalDataSource,
            backgroundColor: 'rgba(55, 169, 245,0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Média',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'rgba(255, 0, 0, 1)',
            pointRadius: 1,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Exponencial',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'rgba(0, 120, 255, 1)',
            pointRadius: 1,
            borderWidth: 1,
          },
          {
            label: 'Linha de Tendência Aritmetica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'rgba(0, 0, 0, 1)',
            pointRadius: 1,
            borderWidth: 2,
          },
          {
            label: 'Linha de Tendência Logaritmica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'rgba(0, 0, 0, 1)',
            pointRadius: 1,
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
            offset: true,
            grid: {
              display: true,
            },
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
    this.originalLabels = JSON.parse(JSON.stringify([...this.chartRanking.data.labels]));
  }

  updateDataSourceBasedOnEvent(event: string): void {
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
    if (this.isOutliersShow) {
      this.adicionaOutliers(this.chartRanking.data.datasets[0].data);
    } else {
      this.removeOutliers(this.chartRanking.data.datasets[0].data);
    }

    this.checkSorted();
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  //////////////////////////////////////////////////////////////////////

  updateChartAndTrendLines(): void {
    if (this.isExponentialTrendLineShow) {
      this.adicionarLinhaTendenciaExponencial();
    } else {
      this.removerLinhaTendenciaExponencial();
    }

    if (this.isArithmeticTrendLineShow) {
      this.adicionarLinhaTendenciaAritmetica();
    } else {
      this.removerLinhaTendenciaAritmetica();
    }

    if (this.isLogarithmLineDataTrendLineShow) {
      this.adicionarLinhaTendenciaLogarithm();
    } else {
      this.removerLinhaTendenciaLogarithm();
    }

    if (this.isAvaregeShow) {
      this.adicionarMedia();
    } else {
      this.removerMedia();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  toggleShowFormula(): void {
    this.isFormulaShow = !this.isFormulaShow;
    this.setAritmeticTrenLineExpression()
    this.setLogarithmicTrenLineExpression()
    this.setAvaregeExpression()
    this.setExponentialTrenLineExpression()
    this.setOutLierInput()
  }

  ///////////////////////////////////////////////////////////////////////////
  toggleOutliers(): void {
    this.isOutliersShow = !this.isOutliersShow;
    this.checkOutliers();
    this.checkSorted();
    this.setOutLierInput()
  }

  checkOutliers(): void {
    if (this.isOutliersShow) {
      this.adicionaOutliers(this.originalDataSource as number[]);
    } else {
      this.removeOutliers(this.chartRanking.data.datasets[0].data);
    }
  }

  removeOutliers(data: number[]): void {
    const dataWithOutliers: number[] = this.mathService.removeOutliers(data as number[], 2.0 );
    this.chartRanking.data.datasets[0].data = dataWithOutliers;
    this.outliersData = dataWithOutliers;
    this.chartRanking.update();
  }

  adicionaOutliers(data: number[]): void {
    this.chartRanking.data.datasets[0].data = data;
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  //////////////////////////////////////////////////////////////////
  toggleOrdenado(): void {
    this.isSorted = !this.isSorted;
    this.checkSorted();
  }

  checkSorted(): void {
    if (this.isSorted) {
      this.ordenar();
    } else {
      this.mostrarOriginal();
    }
  }
  ordenar(): void {
    let data : number[] = this.chartRanking.data.datasets[0].data;
    const labels: string [] = this.chartRanking.data.labels;
    this.mathService.sort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  mostrarOriginal(): void {
    let data: number[] = this.chartRanking.data.datasets[0].data;
    const labels: string[] = this.chartRanking.data.labels;
    this.mathService.unSort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  ///////////////////////////////////////////////////////////////////////////////

  toggleTendenciaArithmetic(): void {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines();
    this.setAritmeticTrenLineExpression()
  }

  private adicionarLinhaTendenciaAritmetica(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isArithmeticTrendLineShow = true;
    const trendLineData: number[] = this.mathService.calculateArithmeticTrendLine(data);
    this.chartRanking.data.datasets[3].data = trendLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaAritmetica(): void {
    this.isArithmeticTrendLineShow = false;
    this.chartRanking.data.datasets[3].data = [];
    this.chartRanking.update();
  }

  ////////////////////////////////////////////////////////////////////

  toggleTendenciaExponencial(): void {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines();
    this.setExponentialTrenLineExpression();
  }

  private adicionarLinhaTendenciaExponencial(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData: number[] = this.mathService.calculateExponentialTrendLine(data);
    this.chartRanking.data.datasets[2].data = trendExponetialLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaExponencial(): void {
    this.isExponentialTrendLineShow = false;
    this.chartRanking.data.datasets[2].data = [];
    this.chartRanking.update();
  }

  ////////////////////////////////////////////////////////////

  toggleTendenciaLogarithm(): void {
    this.isLogarithmLineDataTrendLineShow = !this.isLogarithmLineDataTrendLineShow;
    this.updateChartAndTrendLines();
    this.setLogarithmicTrenLineExpression()
  }

  private adicionarLinhaTendenciaLogarithm(): void {
    const data:number[] = this.chartRanking.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true;
    const trendLogarithmLineData: number[] = this.mathService.calculateLogarithmicTrendLine(data);
    this.chartRanking.data.datasets[4].data = trendLogarithmLineData;
    this.chartRanking.update();
  }

  private removerLinhaTendenciaLogarithm(): void {
    this.isLogarithmLineDataTrendLineShow = false;
    this.chartRanking.data.datasets[4].data = [];
    this.chartRanking.update();
  }

  ///////////////////////////////////////////////////

  toggleMedia(): void {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.setAvaregeExpression();
    this.updateChartAndTrendLines();
  }

  private adicionarMedia(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    const media: number = this.mathService.calculateAverage(data);
    this.chartRanking.data.datasets[1].data = Array(data.length).fill(media);
    this.chartRanking.update();
  }

  private removerMedia(): void {
    this.chartRanking.data.datasets[1].data = [];
    this.chartRanking.update();
  }

  ngOnDestroy(): void {
    if (this.chartRanking) {
      this.chartRanking.destroy();
    }
  }
}
