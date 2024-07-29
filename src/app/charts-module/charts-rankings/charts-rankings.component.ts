import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js/auto';
import { KatexService } from 'src/app/services/katex.service';
import { MathService } from 'src/app/services/math.service';
import { OcurrencesService } from 'src/app/services/ocurrences.service';

import { OverdueService } from 'src/app/services/overdue.service';
import { RankingService } from 'src/app/services/ranking.service';


@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit {
  // @ViewChild('exampleModal')
  // exampleModal!: ElementRef;

  typeChart: string = 'bar';

  title = 'ng-chart';
  chartRanking: any = [];

  isSorted: boolean = false;
  isAvaregeShow: boolean = false;
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;
  isLogarithmLineDataTrendLineShow: boolean = false;


  isFormulaShow: boolean = false



  isOcurrenceActive: boolean = false;
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
    private rankingService: RankingService,
    private overdueService: OverdueService,
    private ocurrencesService: OcurrencesService
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
    this.overdueService.loadData()
    this.ocurrencesService.loadData()   
    this.isBaseActive = true;
    this.originalDataSource = [...this.rankingService.baseDataSource];
    this.showChart();
  }

  setLogarithmicTrendLineExpression(): void {
    if (this.isLogarithmLineDataTrendLineShow && this.isFormulaShow) {
      this.logaritmicTrendLineExpression = this.katexService.getLogarithmicTrendLineFormula();
      this.katexService.renderMathExpression(this.logaritmicTrendLineExpression, 'linhaDeTendenciaLogaritmica');
    } else {
      this.logaritmicTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaLogaritmica');
    }
  }

  setAritmeticTrendLineExpression(): void {
    if (this.isArithmeticTrendLineShow && this.isFormulaShow) {
      this.arithmeticTrendLineExpression = this.katexService.getArithmeticTrendLineFormula();
      this.katexService.renderMathExpression(this.arithmeticTrendLineExpression, 'linhaDeTendenciaAritimetica');
    } else {
      this.arithmeticTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaAritimetica');
    }
  }

  setExponentialTrendLineExpression(): void {
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
   
    if (event === 'ocurrences') {
      this.isOcurrenceActive = true;     
      this.isRepeatedActive = false;
      this.isBaseActive = false;
      this.originalDataSource = [...this.ocurrencesService.getData()];
    }
    if (event === 'overdue') {
      this.isRepeatedActive = true;
      this.isOcurrenceActive = false;    
      this.isBaseActive = false;
      this.originalDataSource = [...this.overdueService.getData()];
    }
    if (event === 'base') {
      this.isBaseActive = true;
      this.isRepeatedActive = false;
      this.isOcurrenceActive = false;     
      this.originalDataSource = [... this.overdueService.getData()];
    }

    this.chartRanking.data.datasets[0].data = this.originalDataSource;
    if (this.isOutliersShow) {
      this.addOutliers(this.chartRanking.data.datasets[0].data);
    } else {
      this.removeOutliers(this.chartRanking.data.datasets[0].data);
    }

    this.checkSorted();
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }


  updateChartAndTrendLines(): void {
    if (this.isExponentialTrendLineShow) {
      this.addExponentialArithmeticTrendLine();
    } else {
      this.removeExponentialArithmeticTrendLine();
    }

    if (this.isArithmeticTrendLineShow) {
      this.addArithmeticTrendLine();
    } else {
      this.removerArithmeticTrendLine();
    }

    if (this.isLogarithmLineDataTrendLineShow) {
      this.addLogarithmTrendLine();
    } else {
      this.removeLogarithmTrendLine();
    }

    if (this.isAvaregeShow) {
      this.addAvarege();
    } else {
      this.removeAvarege();
    }
  }

  toggleShowFormula(): void {
    this.isFormulaShow = !this.isFormulaShow;
    this.setAritmeticTrendLineExpression()
    this.setLogarithmicTrendLineExpression()
    this.setAvaregeExpression()
    this.setExponentialTrendLineExpression()
    this.setOutLierInput()
  }

  toggleOutliers(): void {
    this.isOutliersShow = !this.isOutliersShow;
    this.checkOutliers();
    this.checkSorted();
    this.setOutLierInput()
  }

  checkOutliers(): void {
    if (this.isOutliersShow) {
      this.addOutliers(this.originalDataSource as number[]);
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

  addOutliers(data: number[]): void {
    this.chartRanking.data.datasets[0].data = data;
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }
  
  toggleSorted(): void {
    this.isSorted = !this.isSorted;
    this.checkSorted();
  }

  checkSorted(): void {
    if (this.isSorted) {
      this.sort();
    } else {
      this.unsort();
    }
  }
  sort(): void {
    let data : number[] = this.chartRanking.data.datasets[0].data;
    const labels: string [] = this.chartRanking.data.labels;
    this.mathService.sort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  unsort(): void {
    let data: number[] = this.chartRanking.data.datasets[0].data;
    const labels: string[] = this.chartRanking.data.labels;
    this.mathService.unSort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  toggleArithmeticTrendLine(): void {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines();
    this.setAritmeticTrendLineExpression()
  }

  private addArithmeticTrendLine(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isArithmeticTrendLineShow = true;
    const trendLineData: number[] = this.mathService.calculateArithmeticTrendLine(data);
    this.chartRanking.data.datasets[3].data = trendLineData;
    this.chartRanking.update();
  }

  private removerArithmeticTrendLine(): void {
    this.isArithmeticTrendLineShow = false;
    this.chartRanking.data.datasets[3].data = [];
    this.chartRanking.update();
  }

  toggleExponentialTrendLine(): void {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines();
    this.setExponentialTrendLineExpression();
  }

  private addExponentialArithmeticTrendLine(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData: number[] = this.mathService.calculateExponentialTrendLine(data);
    this.chartRanking.data.datasets[2].data = trendExponetialLineData;
    this.chartRanking.update();
  }

  private removeExponentialArithmeticTrendLine(): void {
    this.isExponentialTrendLineShow = false;
    this.chartRanking.data.datasets[2].data = [];
    this.chartRanking.update();
  }

  toggleLogarithmTrendLine(): void {
    this.isLogarithmLineDataTrendLineShow = !this.isLogarithmLineDataTrendLineShow;
    this.updateChartAndTrendLines();
    this.setLogarithmicTrendLineExpression()
  }

  private addLogarithmTrendLine(): void {
    const data:number[] = this.chartRanking.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true;
    const trendLogarithmLineData: number[] = this.mathService.calculateLogarithmicTrendLine(data);
    this.chartRanking.data.datasets[4].data = trendLogarithmLineData;
    this.chartRanking.update();
  }

  private removeLogarithmTrendLine(): void {
    this.isLogarithmLineDataTrendLineShow = false;
    this.chartRanking.data.datasets[4].data = [];
    this.chartRanking.update();
  }

  toggleAvarege(): void {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.setAvaregeExpression();
    this.updateChartAndTrendLines();
  }

  private addAvarege(): void {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    const media: number = this.mathService.calculateAverage(data);
    this.chartRanking.data.datasets[1].data = Array(data.length).fill(media);
    this.chartRanking.update();
  }

  private removeAvarege(): void {
    this.chartRanking.data.datasets[1].data = [];
    this.chartRanking.update();
  }

  ngOnDestroy(): void {
    if (this.chartRanking) {
      this.chartRanking.destroy();
    }
  }
}
