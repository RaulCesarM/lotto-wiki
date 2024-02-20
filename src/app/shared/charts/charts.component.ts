import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() dataSource: number[] = [];

  chart: any;

  ngOnInit() {
    this.renderChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && !changes['dataSource'].firstChange) {
      this.updateChart();
    }
  }

  renderChart() {
    this.chart = new Chart('canvasaa', {
      type: 'bar',
      data: {
        labels: ['1', '2', '3', '4', '5'], 
        datasets: [{
          label: 'Data',
          data: this.dataSource,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      }      ,
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

   
  }

  updateChart() {
    this.chart.data.datasets[0].data = this.dataSource;
    this.chart.update();
  }
}
