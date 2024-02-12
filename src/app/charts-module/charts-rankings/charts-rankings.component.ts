import {  Component,  ElementRef,  OnInit} from '@angular/core';
import Chart from 'chart.js/auto';
import { KatexService } from 'src/app/katex-module/katex.service';
import { EquationsSeviceService } from 'src/app/math-modules/equations-sevice.service';

@Component({
  selector: 'app-charts-rankings',
  templateUrl: './charts-rankings.component.html',
  styleUrls: ['./charts-rankings.component.css'],
})
export class ChartsRankingsComponent implements OnInit{

  title = 'ng-chart';
  chart: any = [];

  
  isSorted: boolean = false;
  isAvaregeShow: boolean = false; 
  isExponentialTrendLineShow: boolean = false;
  isArithmeticTrendLineShow: boolean = false;


  isOutliersShow: boolean = true;

  
  originalData: any[] | undefined;
  originalLabels: any[] | undefined;



  constructor(
    private elRef: ElementRef,
    private katexService : KatexService,
    private mathService : EquationsSeviceService

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
            data: [ 12, 19, 43, 5, 2, 3, 19, 31, 5, 21, 13, 19, 3, 5, 12, 23, 19, 23,52, 2, 23, 19, 33, 25, 8,],
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
            label: 'Linha de Tendência Exponencial',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'blue',
            pointRadius: 2,
            borderWidth: 2,
          },
          {
            label: 'Linha de Tendência Aritmetica',
            data: [],
            type: 'line',
            fill: false,
            borderColor: 'Orange',
            pointRadius: 2,
            borderWidth: 2,
          }
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
    this.originalData = JSON.parse( JSON.stringify(this.chart.data.datasets[0].data)
    );
    this.originalLabels = JSON.parse(JSON.stringify(this.chart.data.labels));
  }

//////////////////////////////////////////////// toggles

  toggleOrdenado() {
    this.isSorted = !this.isSorted;
    if (this.isSorted) {
      this.ordenar();
    } else {
      this.mostrarOriginal();
    }
  }


  toggleMedia() {
    this.isAvaregeShow = !this.isAvaregeShow;
    if (this.isAvaregeShow) {
      this.adicionarMedia();
    } else {
      this.removerMedia();
    }
    this.chart.update();
  }








////////////////////////////////////////////ordenação//////////////////////////

toggleTendenciaExponencial() {
  this.isExponentialTrendLineShow = !this.isExponentialTrendLineShow;
  if (this.isExponentialTrendLineShow) {
    this.adicionarLinhaTendenciaExponencial();
  } else {
    this.removerLinhaTendenciaExponencial();
  }
  this.chart.update();
}



toggleTendenciaArithmetic() {
  this.isArithmeticTrendLineShow = !this.isArithmeticTrendLineShow;
  if (this.isArithmeticTrendLineShow) {
    this.adicionarLinhaTendenciaAritmetica();
  } else {
    this.removerLinhaTendenciaAritmetica();
  }
  this.chart.update();
}




private removerLinhaTendenciaAritmetica() {
  this.isArithmeticTrendLineShow = false;
  this.chart.data.datasets[2].data = [];
  this.chart.update();
}


//////////////////////////////////////////////////////////////////



  ordenar() {
    let data = this.chart.data.datasets[0].data;
    const labels = this.chart.data.labels;
    let dataWithLabels = [];   
    dataWithLabels = this.mathService.sort(data, labels )
    this.chart.update();
    if (this.isExponentialTrendLineShow === true) {
      this.adicionarLinhaTendenciaExponencial();     
      this.chart.update();
    }
    if(this.isArithmeticTrendLineShow === true){
      this.adicionarLinhaTendenciaAritmetica();
      this.chart.update();
    }
    this.chart.update();
  }

  mostrarOriginal() {
    this.chart.data.datasets[0].data = JSON.parse(JSON.stringify(this.originalData));    
    this.chart.data.labels = JSON.parse(JSON.stringify(this.originalLabels));

    if (this.isExponentialTrendLineShow === true) {
      this.adicionarLinhaTendenciaExponencial();     
      this.chart.update();
    }
    if(this.isArithmeticTrendLineShow === true){
      this.adicionarLinhaTendenciaAritmetica();
      this.chart.update();
    }
    this.chart.update();
  }




/////////////////////////////////linha de tendencia exponencial


private adicionarLinhaTendenciaAritmetica() {
  // if (this.isSorted === true) {
  //   this.chart.update();
  // }
  const data = this.chart.data.datasets[0].data;
  this.isArithmeticTrendLineShow = true;
  const trendLineData = this.mathService.calculateArithmeticTrendLine(data)
  this.chart.data.datasets[2].data = trendLineData;
  this.chart.update();
}



  private adicionarLinhaTendenciaExponencial() {
    // if (this.isSorted === true) {
    //   this.chart.update();
    // }
    const data = this.chart.data.datasets[0].data;
    this.isExponentialTrendLineShow = true;
    const trendExponetialLineData = this.mathService.calculateExponentialTrendLine(data)
    this.chart.data.datasets[3].data = trendExponetialLineData;
    this.chart.update();
  }


  private removerLinhaTendenciaExponencial() {
    this.isExponentialTrendLineShow = false;
    this.chart.data.datasets[3].data = [];
    this.chart.update();
  }



  ////////////////////////////media///////////////////////////

 
  private adicionarMedia() {
    const data = this.chart.data.datasets[0].data;
    const media = this.mathService.calculateAverage(data)
    this.chart.data.datasets[1].data = Array(data.length).fill(media);
    this.chart.update();
  }

  private removerMedia() {
    this.chart.data.datasets[1].data = [];
    this.chart.update();
  }

  toggleOutliers() {
    this.isOutliersShow = !this.isOutliersShow;
    if (this.isOutliersShow) {
        this.removerOutliers();
    } else {
        this.mostrarOriginal();
    }
    this.chart.update();
}











removerOutliers() {
  let originalData: number[] = this.originalData || []; 
  const dataWithoutOutliers = this.removeOutliers(originalData);
  this.chart.data.datasets[0].data = dataWithoutOutliers;
  this.chart.update();
}
private removeOutliers(data: number[]) {
  let sum = 0;
    for (let i = 0; i < data.length; i++) {
        sum += data[i];
    }
    const mean = sum / data.length;

   
    let variance = 0;
    for (let i = 0; i < data.length; i++) {
        variance += Math.pow(data[i] - mean, 2);
    }
    const stdDev = Math.sqrt(variance / data.length);

   
    const threshold = 3; 

    
    const outliersRemoved = data.filter(value => Math.abs(value - mean) <= threshold * stdDev);

    return outliersRemoved;
}




















}
