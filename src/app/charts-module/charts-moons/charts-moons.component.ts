import { Component, OnInit } from '@angular/core';
import { Chart, ChartTypeRegistry } from 'chart.js';
import { LunationService } from 'src/app/services/lunation.service';

@Component({
  selector: 'app-charts-moons',
  templateUrl: './charts-moons.component.html',
  styleUrls: ['./charts-moons.component.css']
})
export class ChartsMoonsComponent implements OnInit {
  originalData: any[] | undefined;
  originalLabels: any[] | undefined;

  originalDataSource: number[] | undefined;


 
  newMoonDataSource: number[] =[];
  crescenteMoonDataSource: number[] =[];
  quarterCrescentMoonDataSource: number[] =[];  
  gibousCrescentMoonDataSource: number[] =[];
  fullMoonDataSource: number[] =[];
  gibousWaningMoonDataSource: number[]=[];
  quarterWaningDataSource:number[]=[];
  waningMoonDataSource: number[] =[];
 

  typeChart: string = 'bar';
  chartMoon: any = [];
  isAvaregeShow: boolean = false;
  isSorted: boolean = false;



  isFullMoonActive: boolean = false;
  isCrescentMoonActive: boolean = false;
  isWanningMoonActive: boolean = false;
  isNewMoonActive: boolean = false;

  isQuarterCrescentMoonActive: boolean =false;  
  isGiboseCrescentMoonActive: boolean =false;  
  isGiboseWaningMoonActive:  boolean =false;  
  isQuarterWaningActive: boolean =false;  


  
  

  constructor(private service: LunationService) {}

  async ngOnInit(): Promise<void> {
    this.isFullMoonActive = true;
    await this.service.loadData(); 
  // this.originalDataSource =[...this.service.getFullMoon()]; 
    this.fullMoonDataSource = [...this.service.getFullMoon()]; 
    this.newMoonDataSource = [...this.service.getNewMoon()];
    this.crescenteMoonDataSource = [...this.service.getCrescentMoon()];
    this.waningMoonDataSource = [...this.service.getWaningMoons()];

    this.quarterCrescentMoonDataSource = [...this.service.getQuarterCrescentMoon()]; 
    this.quarterWaningDataSource = [...this.service.getQuarterWaningMoon()];
    this.gibousCrescentMoonDataSource = [...this.service.getGibousCrescentMoon()];
    this.gibousWaningMoonDataSource = [...this.service.getGibousWaningMoon()];
    this.showChart();
  }

  showChart() {
    this.chartMoon = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [...this.service.labelsDataSource],
        datasets: [
          {
            label: 'Lua Cheia',
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

    this.originalData = JSON.parse(JSON.stringify(this.chartMoon.data.datasets[0].data));
    this.originalLabels = JSON.parse(JSON.stringify([...this.chartMoon.data.labels]));
  }

  saveType($event: any) {
    throw new Error('Method not implemented.');
  }

  toggleAvarege() {
    throw new Error('Method not implemented.');
  }

  updateDataSourceBasedOnEvent(arg0: string) {
    if (arg0 === 'newMoon') {
      this.isNewMoonActive = true;
      this.isWanningMoonActive = false;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.newMoonDataSource];
    }
    if (arg0 === 'crescentMoon') {
      this.isCrescentMoonActive = true;
      this.isFullMoonActive = false;    
      this.isWanningMoonActive = false;
      this.isNewMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.crescenteMoonDataSource];
    }
    if (arg0 === 'fullMoon') {
      this.isFullMoonActive = true;
      this.isCrescentMoonActive = false;
      this.isWanningMoonActive = false;
      this.isNewMoonActive = false;

      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [... this.fullMoonDataSource];
    }

    if (arg0 === 'quarterCrescentMoon') {
      this.isNewMoonActive = false;
      this.isWanningMoonActive = false;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = true;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.quarterCrescentMoonDataSource];
    }

    if (arg0 === 'gibousCrescentMoon') {
      this.isNewMoonActive = false;
      this.isWanningMoonActive = false;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = true;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.gibousCrescentMoonDataSource];
    }

    if (arg0 === 'gibousWaningMoon') {
      this.isNewMoonActive = false;
      this.isWanningMoonActive = false;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = true;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.gibousWaningMoonDataSource];
    }

   

    if (arg0 === 'quarterWaningMoon') {
      this.isNewMoonActive = false;
      this.isWanningMoonActive = false;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = true;
      this.chartMoon.data.datasets[0].data = [...this.quarterWaningDataSource];
    }

    if (arg0 === 'waningMoon') {
      this.isNewMoonActive = false;
      this.isWanningMoonActive = true;
      this.isCrescentMoonActive = false;
      this.isFullMoonActive = false;
      this.isQuarterCrescentMoonActive = false;
      this.isGiboseCrescentMoonActive = false;
      this.isGiboseWaningMoonActive = false;
      this.isQuarterWaningActive = false;
      this.chartMoon.data.datasets[0].data = [...this.quarterWaningDataSource];
    }
    this.chartMoon.update();
  }

  toggleSorted() {
    throw new Error('Method not implemented.');
  }
}
