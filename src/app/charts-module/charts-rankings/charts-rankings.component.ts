import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';
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

  typeChart: string = 'bar';

  title = 'ng-chart';
  chartRanking: any = [];

  isSorted: boolean = false;
  isAvaregeShow: boolean = false;
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;
  isLogarithmLineDataTrendLineShow: boolean = false;


  isFormulaShow = false


  isHaveyActive = false;
  isLightActive = false;
  isRepeatedActive = false;
  isBaseActive = true;

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

  avaregeExpression: string = '';
  exponetialTrendLineExpression: string = '';
  arithmeticTrendLineExpression: string = '';
  logaritmicTrendLineExpression: string = '';

  outlierInputValue: number = 5

  setOutLierInput() {
    if (!this.isOutliersShow && this.isFormulaShow) {
      const expression = `\\text{Outlier} = ${this.outlierInputValue.toString()}`;
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

  setLogarithmicTrenLineExpression() {
    if (this.isLogarithmLineDataTrendLineShow && this.isFormulaShow) {
      this.logaritmicTrendLineExpression = this.katexService.getLogarithmicTrendLineFormula();
      this.katexService.renderMathExpression(this.logaritmicTrendLineExpression, 'linhaDeTendenciaLogaritmica');
    } else {
      this.logaritmicTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaLogaritmica');
    }
  }

  setAritmeticTrenLineExpression() {
    if (this.isArithmeticTrendLineShow && this.isFormulaShow) {
      this.arithmeticTrendLineExpression = this.katexService.getArithmeticTrendLineFormula();
      this.katexService.renderMathExpression(this.arithmeticTrendLineExpression, 'linhaDeTendenciaAritimetica');
    } else {
      this.arithmeticTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaAritimetica');
    }
  }

  setExponentialTrenLineExpression() {
    if (this.isExponentialTrendLineShow && this.isFormulaShow) {
      this.exponetialTrendLineExpression = this.katexService.getExponentialTrendLineFormula();
      this.katexService.renderMathExpression(this.exponetialTrendLineExpression, 'linhaTendenciaFormula');
    } else {
      this.exponetialTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaTendenciaFormula');
    }
  }

  setAvaregeExpression() {
    if (this.isAvaregeShow && this.isFormulaShow) {
      this.avaregeExpression = this.katexService.getSimpleArithmethicMeanFormula();
      this.katexService.renderMathExpression(this.avaregeExpression, 'media');
    } else {
      this.avaregeExpression = '';
      this.katexService.renderMathExpression('', 'media');
    }
  }

  saveType(selectedValue: string) {
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
              display: false,
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
      JSON.stringify(this.chartRanking.data.datasets[0].data)
    );
    this.originalLabels = JSON.parse(
      JSON.stringify([...this.chartRanking.data.labels])
    );
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

  updateChartAndTrendLines() {
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

  toggleShowFormula() {
    this.isFormulaShow = !this.isFormulaShow;
    this.setAritmeticTrenLineExpression()
    this.setLogarithmicTrenLineExpression()
    this.setAvaregeExpression()
    this.setExponentialTrenLineExpression()
    this.setOutLierInput()
  }

  ///////////////////////////////////////////////////////////////////////////
  toggleOutliers() {
    this.isOutliersShow = !this.isOutliersShow;
    this.checkOutliers();
    this.checkSorted();
    this.setOutLierInput()
  }

  checkOutliers() {
    if (this.isOutliersShow) {
      this.adicionaOutliers(this.originalDataSource as number[]);
    } else {
      this.removeOutliers(this.chartRanking.data.datasets[0].data);
    }
  }

  removeOutliers(data: number[]) {
    const dataWithOutliers = this.mathService.removeOutliers(data as number[], 2.0 );
    this.chartRanking.data.datasets[0].data = dataWithOutliers;
    this.outliersData = dataWithOutliers;
    this.chartRanking.update();
  }

  adicionaOutliers(data: number[]) {
    this.chartRanking.data.datasets[0].data = data;
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  //////////////////////////////////////////////////////////////////
  toggleOrdenado() {
    this.isSorted = !this.isSorted;
    this.checkSorted();
  }

  checkSorted() {
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
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  mostrarOriginal() {
    let data = this.chartRanking.data.datasets[0].data;
    const labels = this.chartRanking.data.labels;
    let dataWithLabels = this.mathService.unSort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  ///////////////////////////////////////////////////////////////////////////////

  toggleTendenciaArithmetic() {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines();
    this.setAritmeticTrenLineExpression()
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

  ////////////////////////////////////////////////////////////////////

  toggleTendenciaExponencial() {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines();
    this.setExponentialTrenLineExpression();
  }

  private adicionarLinhaTendenciaExponencial() {
    const data = this.chartRanking.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData =
      this.mathService.calculateExponentialTrendLine(data);
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
    this.updateChartAndTrendLines();
    this.setLogarithmicTrenLineExpression()
  }

  private adicionarLinhaTendenciaLogarithm() {
    const data = this.chartRanking.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true;
    const trendLogarithmLineData =
      this.mathService.calculateLogarirmicTrendLine(data);
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
    this.setAvaregeExpression();
    this.updateChartAndTrendLines();
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
