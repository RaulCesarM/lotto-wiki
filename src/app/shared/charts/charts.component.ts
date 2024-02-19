import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  title = 'ng-chart';
  chart: any = [];



  dataSource: number[] = []
  type: "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined;
  fill: boolean = false
  borderColor:string= ''
  pointRadius: number =1
  borderWidth: number =1



  ngOnInit() {

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Média',
            data: this.dataSource,
            type: this.type,
            fill: this.fill,
            borderColor: this.borderColor,
            pointRadius: this.pointRadius,
            borderWidth: this.borderWidth,
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
  }
}


