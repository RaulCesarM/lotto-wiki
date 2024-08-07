import { Component, OnInit } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { MoonPhase } from 'src/app/models/moonPhase';
import { MoonPhasesFlags } from 'src/app/models/moonPhasesFlags';
import { LunationService } from 'src/app/services/lunation.service';
import { MathService } from 'src/app/services/math.service';

@Component({
  selector: 'app-charts-moons',
  templateUrl: './charts-moons.component.html',
  styleUrls: ['./charts-moons.component.css']
})
export class ChartsMoonsComponent implements OnInit {
  protected originalData: number[] = [];
  protected originalLabels: string[] = [];
  protected originalDataSource: number[] = [];
  protected typeChart: string = 'bar';
  protected chartMoon: any = [];
  protected isAvaregeShow: boolean = false;
  protected isSorted: boolean = false;
  protected phase = MoonPhase;
  protected activeFlag = MoonPhasesFlags;

  constructor(private service: LunationService,
    private mathService: MathService
  ) {}

  async ngOnInit(): Promise<void> {      
    this.setFlagsFalse();  
   await this.showChart();
  }

  protected async showChart(type?: string) {
    this.chartMoon = new Chart('canvas', {
      type: (type as keyof ChartTypeRegistry) || 'bar',
      data: {
        labels: [...this.service.labelsDataSource],
        datasets:[... await this.service.GetDataSets()],
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

    this.originalData = JSON.parse(JSON.stringify(this.chartMoon.data.datasets[0].data));
    this.originalLabels = JSON.parse(JSON.stringify([...this.chartMoon.data.labels]));
  }

  protected async saveType(selectedValue: string) {
   await this.service.saveTypeService(selectedValue)
    this.chartMoon.data.datasets = [... await this.service.GetDataSets()];
    this.updateChartAndTrendLines();
    this.checkSorted();
    this.chartMoon.update();
  }

  protected toggleAvarege(): void {
    this.isAvaregeShow = !this.isAvaregeShow;
    this.updateChartAndTrendLines();
  }

  private updateChartAndTrendLines(): void {
    if (this.isAvaregeShow) {
      this.addAvarege();
    } else {
      this.removeAvarege();
    }
  }

  private async addAvarege(): Promise<void> {
    const data: number[] = this.chartMoon.data.datasets[0].data;
    const media: number = await this.mathService.calculateAverage(data);
    this.chartMoon.data.datasets[1].data = Array(data.length).fill(media);
    this.chartMoon.update();
  }

  private removeAvarege(): void {
    this.chartMoon.data.datasets[1].data = [];
    this.chartMoon.update();
  }

  private setFlagsFalse(): void {
    this.activeFlag.isNewMoonActive = false;
    this.activeFlag.isCrescentMoonActive = false;
    this.activeFlag.isQuarterCrescentMoonActive = false;
    this.activeFlag.isGibbousCrescentMoonActive = false;
    this.activeFlag.isFullMoonActive = false;
    this.activeFlag.isGibbousWaningMoonActive = false;
    this.activeFlag.isQuarterWaningActive = false;
    this.activeFlag.isWanningMoonActive = false;
  }

  protected async updateDataSource(moonPhase: MoonPhase): Promise<void> {
    // this.isSorted = false;
    // this.checkSorted();
    this.setFlagsFalse();
    switch (moonPhase) {
      case MoonPhase.NewMoon:
        this.activeFlag.isNewMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getNewMoon()];
        break;
      case MoonPhase.CrescentMoon:
        this.activeFlag.isCrescentMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getCrescentMoon()];
        break;
      case MoonPhase.QuarterCrescentMoon:
        this.activeFlag.isQuarterCrescentMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getQuarterCrescentMoon()];
        break;
      case MoonPhase.GibbousCrescentMoon:
        this.activeFlag.isGibbousCrescentMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getGibbousCrescentMoon()];
        break;
      case MoonPhase.FullMoon:
        this.activeFlag.isFullMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getFullMoon()];
        break;
      case MoonPhase.GibbousWaningMoon:
        this.activeFlag.isGibbousWaningMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getGibbousWaningMoon()];
        break;
      case MoonPhase.QuarterWaningMoon:
        this.activeFlag.isQuarterWaningActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getQuarterWaningMoon()];
        break;
      case MoonPhase.WaningMoon:
        this.activeFlag.isWanningMoonActive = true;
        this.chartMoon.data.datasets[0].data = [...await this.service.getWaningMoons()];
        break;
      default:
    }
    this.updateChartAndTrendLines();
    this.checkSorted();
    this.chartMoon.update();
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
  private sort(): void {
    let data: number[] = this.chartMoon.data.datasets[0].data;
    const labels: string[] = this.chartMoon.data.labels;
    this.mathService.sort(data, labels);
    this.chartMoon.update();
  }

  private unsort(): void {
    let data: number[] = this.chartMoon.data.datasets[0].data;
    const labels: string[] = this.chartMoon.data.labels;
    this.mathService.unSort(data, labels);
    this.chartMoon.update();
  }

}
