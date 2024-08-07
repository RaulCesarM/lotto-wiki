import { Component,  OnInit} from '@angular/core';
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
  isOverdueActive: boolean = false;
  isOutliersShow: boolean = true;
  originalData: any[] | undefined;
  originalLabels: string[] | undefined;
  originalDataSource: number[] | undefined;
  outliersData: number[] | undefined;

  constructor(
    private katexService: KatexService,
    private mathService: MathService,
    private rankingService: RankingService,
    private overdueService: OverdueService,
    private ocurrencesService: OcurrencesService
  ) {}

  protected avaregeExpression: string = '';
  protected exponetialTrendLineExpression: string = '';
  protected arithmeticTrendLineExpression: string = '';
  protected logaritmicTrendLineExpression: string = '';
  protected outlierInputValue: number = 5

  async ngOnInit(): Promise<void> {
    this.isOcurrenceActive = true
    this.originalDataSource = [...await this.ocurrencesService.getData()]    
    this.showChart();  
    this.initChart(); 
  }
  protected setOutLierInput(): void {
    if (!this.isOutliersShow && this.isFormulaShow) {
      const expression: string = `\\text{Outlier} = ${this.outlierInputValue.toString()}`;
      this.katexService.renderMathExpression(expression, 'outlierKatex');
    } else {
      this.katexService.renderMathExpression('', 'outlierKatex');
    }
  }

  private setLogarithmicTrendLineExpression(): void {
    if (this.isLogarithmLineDataTrendLineShow && this.isFormulaShow) {
      this.logaritmicTrendLineExpression = this.katexService.getLogarithmicTrendLineFormula();
      this.katexService.renderMathExpression(this.logaritmicTrendLineExpression, 'linhaDeTendenciaLogaritmica');
    } else {
      this.logaritmicTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaLogaritmica');
    }
  }

  private setAritmeticTrendLineExpression(): void {
    if (this.isArithmeticTrendLineShow && this.isFormulaShow) {
      this.arithmeticTrendLineExpression = this.katexService.getArithmeticTrendLineFormula();
      this.katexService.renderMathExpression(this.arithmeticTrendLineExpression, 'linhaDeTendenciaAritimetica');
    } else {
      this.arithmeticTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaDeTendenciaAritimetica');
    }
  }

  private setExponentialTrendLineExpression(): void {
    if (this.isExponentialTrendLineShow && this.isFormulaShow) {
      this.exponetialTrendLineExpression = this.katexService.getExponentialTrendLineFormula();
      this.katexService.renderMathExpression(this.exponetialTrendLineExpression, 'linhaTendenciaFormula');
    } else {
      this.exponetialTrendLineExpression = '';
      this.katexService.renderMathExpression('', 'linhaTendenciaFormula');
    }
  }

  private setAvaregeExpression(): void {
    if (this.isAvaregeShow && this.isFormulaShow) {
      this.avaregeExpression = this.katexService.getSimpleArithmethicMeanFormula();
      this.katexService.renderMathExpression(this.avaregeExpression, 'media');
    } else {
      this.avaregeExpression = '';
      this.katexService.renderMathExpression('', 'media');
    }
  }

  private showChart(type?: string): void {
    this.chartRanking = new Chart('canvas', {
      type: (type as keyof ChartTypeRegistry) || 'bar',
      data: {
        labels: [...this.rankingService.labelsDataSource],
        datasets:[... this.rankingService.getDataSets()]      
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

  private setFlagsFalse(): void {
    this.isOcurrenceActive = false;
    this.isOverdueActive = false;
  }

  protected async updateDataSourceBasedOnEvent(event: string): Promise<void> {
    if (event === 'ocurrences') {
      this.setFlagsFalse();
      this.isOcurrenceActive = true;
      this.originalDataSource = [... await this.ocurrencesService.getData()];
    }
    if (event === 'overdue') {
      this.setFlagsFalse();
      this.isOverdueActive = true;
      this.originalDataSource = [...await this.overdueService.getData()];
    }

    this.chartRanking.data.datasets[0].data = this.originalDataSource;
    this.checkSorted();
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  initChart(): void{
    this.chartRanking.data.datasets[0].data = this.originalDataSource;
    this.checkSorted();
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }


  private updateChartAndTrendLines(): void {
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

  protected toggleShowFormula(): void {
    this.isFormulaShow = !this.isFormulaShow;
    this.setAritmeticTrendLineExpression()
    this.setLogarithmicTrendLineExpression()
    this.setAvaregeExpression()
    this.setExponentialTrendLineExpression()
    this.setOutLierInput()
  }

  protected toggleSorted(): void {
    this.isSorted = !this.isSorted;
    this.checkSorted();
  }

  private checkSorted(): void {
    if (this.isSorted) {
      this.sort();
    } else {
      this.unsort();
    }
  }
  protected sort(): void {
    let data: number[] = this.chartRanking.data.datasets[0].data;
    const labels: string[] = this.chartRanking.data.labels;
    this.mathService.sort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  protected unsort(): void {
    let data: number[] = this.chartRanking.data.datasets[0].data;
    const labels: string[] = this.chartRanking.data.labels;
    this.mathService.unSort(data, labels);
    this.updateChartAndTrendLines();
    this.chartRanking.update();
  }

  protected toggleArithmeticTrendLine(): void {
    this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
    this.updateChartAndTrendLines();
    this.setAritmeticTrendLineExpression()
  }

  private async addArithmeticTrendLine(): Promise<void> {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isArithmeticTrendLineShow = true;
    const trendLineData: number[] = await this.mathService.calculateArithmeticTrendLine(data);
    this.chartRanking.data.datasets[3].data = trendLineData;
    this.chartRanking.update();
  }

  private removerArithmeticTrendLine(): void {
    this.isArithmeticTrendLineShow = false;
    this.chartRanking.data.datasets[3].data = [];
    this.chartRanking.update();
  }

  protected toggleExponentialTrendLine(): void {
    this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
    this.updateChartAndTrendLines();
    this.setExponentialTrendLineExpression();
  }

  private async addExponentialArithmeticTrendLine(): Promise<void> {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData: number[] = await this.mathService.calculateExponentialTrendLine(data);
    this.chartRanking.data.datasets[2].data = trendExponetialLineData;
    this.chartRanking.update();
  }

  private removeExponentialArithmeticTrendLine(): void {
    this.isExponentialTrendLineShow = false;
    this.chartRanking.data.datasets[2].data = [];
    this.chartRanking.update();
  }

  protected toggleLogarithmTrendLine(): void {
    this.isLogarithmLineDataTrendLineShow = !this.isLogarithmLineDataTrendLineShow;
    this.updateChartAndTrendLines();
    this.setLogarithmicTrendLineExpression()
  }

  private async addLogarithmTrendLine(): Promise<void> {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    this.isLogarithmLineDataTrendLineShow = true;
    const trendLogarithmLineData: number[] = await this.mathService.calculateLogarithmicTrendLine(data);
    this.chartRanking.data.datasets[4].data = trendLogarithmLineData;
    this.chartRanking.update();
  }

  private removeLogarithmTrendLine(): void {
    this.isLogarithmLineDataTrendLineShow = false;
    this.chartRanking.data.datasets[4].data = [];
    this.chartRanking.update();
  }

  protected toggleAvarege(): void {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.setAvaregeExpression();
    this.updateChartAndTrendLines();
  }

  private async addAvarege(): Promise<void> {
    const data: number[] = this.chartRanking.data.datasets[0].data;
    const media: number = await this.mathService.calculateAverage(data);
    this.chartRanking.data.datasets[1].data = Array(data.length).fill(media);
    this.chartRanking.update();
  }

  private removeAvarege(): void {
    this.chartRanking.data.datasets[1].data = [];
    this.chartRanking.update();
  }
}
