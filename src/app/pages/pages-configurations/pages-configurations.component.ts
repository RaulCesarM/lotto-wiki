import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-configurations',
  templateUrl: './pages-configurations.component.html',
  styleUrls: ['./pages-configurations.component.css']
})
export class PagesConfigurationsComponent implements OnInit {

  
  
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


  ////////////////////////////////////////////////////////

  correlationTableMinimumColor: string ='rgb(255, 165, 165)';

  correlationTableMaximumColor:string ='rgb(255, 255, 0)';

  correlationTableFilterColor: string ='rgb(255, 165, 165)';

  correlationTableFilterValueMinimum: number= 1;

  CorrelationTableFilterValueMaximum: number =1;

  //falta o input dos maior e menor
  // falta 


  ///////////////////////////////////////////////////////////

  outlierDeviantMaximumValue:number =5;

  meanAritmethicColor: string ='#0810fc';
  meanAritmethicWidth: number =1;




  ngOnInit() {

    this.rankingChartBarColor = localStorage.getItem('rankingChartBarColor') || this.rankingChartBarColor;
    this.rankingChartBorderBarColor = localStorage.getItem('rankingChartBorderBarColor') || this.rankingChartBorderBarColor;
    this.rankingTypeChart = localStorage.getItem('rankingTypeChart') || this.rankingTypeChart;

    this.powerTrendLineColor = localStorage.getItem('trendLinePowerColor') || this.powerTrendLineColor;   
    this.LinearTrendLineColor = localStorage.getItem('trendLineLinearColor') || this.LinearTrendLineColor;
    this.logarithmicTrendLineColor = localStorage.getItem('logarithmicTrendLineColor') || this.logarithmicTrendLineColor;
    this.exponentialTrendLineColor = localStorage.getItem('exponentialTrendLineColor') || this.exponentialTrendLineColor;
    this.correlationTableMinimumColor = localStorage.getItem('correlationTableMinimumColor') || this.correlationTableMinimumColor;
    this.correlationTableMaximumColor = localStorage.getItem('correlationTableMaximumColor') || this.correlationTableMaximumColor;
    this.correlationTableFilterColor = localStorage.getItem('correlationTableFilterColor') || this.correlationTableFilterColor;
    this.meanAritmethicColor = localStorage.getItem('meanAritmethicColor') || this.meanAritmethicColor;

    this. getValuesLocalStorage()

  }




  getValuesLocalStorage() {


    this.rankingChartBarColor = localStorage.getItem('rankingChartBarColor') || this.rankingChartBarColor;
    this.rankingChartBorderBarColor = localStorage.getItem('rankingChartBorderBarColor') || this.rankingChartBorderBarColor;
    this.rankingTypeChart = localStorage.getItem('rankingTypeChart') || this.rankingTypeChart;

    this.mainBarToRGBA = this.hexToRGBA(this.rankingChartBarColor, 0.5)
    this.mainBorderToRGBA = this.hexToRGBA(this.rankingChartBorderBarColor, 0.5)

    this.powerTrendLineColor = localStorage.getItem('powerTrendLineColor') || this.powerTrendLineColor;   
    this.LinearTrendLineColor = localStorage.getItem('LinearTrendLineColor') || this.LinearTrendLineColor;
    this.logarithmicTrendLineColor = localStorage.getItem('logarithmicTrendLineColor') || this.logarithmicTrendLineColor;
    this.exponentialTrendLineColor = localStorage.getItem('exponentialTrendLineColor') || this.exponentialTrendLineColor;



    this.correlationTableMinimumColor = localStorage.getItem('correlationTableMinimumColor') || this.correlationTableMinimumColor;
    this.correlationTableMaximumColor = localStorage.getItem('correlationTableMaximumColor') || this.correlationTableMaximumColor;
    this.correlationTableFilterColor = localStorage.getItem('correlationTableFilterColor') || this.correlationTableFilterColor;
    this.meanAritmethicColor = localStorage.getItem('meanAritmethicColor') || this.meanAritmethicColor;



    const powerTrendLineWidthString = localStorage.getItem('powerTrendLineWidth');
    this.powerTrendLineWidth = powerTrendLineWidthString !== null ? parseInt(powerTrendLineWidthString) : this.powerTrendLineWidth;

    const linearTrendLineWidthString = localStorage.getItem('linearTrendLineWidth');
    this.linearTrendLineWidth = linearTrendLineWidthString !== null ? parseInt(linearTrendLineWidthString) : this.linearTrendLineWidth;

    const logarithmicTrendLineWidthString = localStorage.getItem('logarithmicTrendLineWidth');
    this.logarithmicTrendLineWidth = logarithmicTrendLineWidthString !== null ? parseInt(logarithmicTrendLineWidthString) : this.logarithmicTrendLineWidth;

    const exponentialTrendLineWidthString = localStorage.getItem('exponentialTrendLineWidth');
    this.exponentialTrendLineWidth = exponentialTrendLineWidthString !== null ? parseInt(exponentialTrendLineWidthString) : this.exponentialTrendLineWidth;

    const correlationTableFilterValueMinimumString = localStorage.getItem('correlationTableFilterValueMinimum');
    this.correlationTableFilterValueMinimum = correlationTableFilterValueMinimumString !== null ? parseInt(correlationTableFilterValueMinimumString) : this.correlationTableFilterValueMinimum;

    const CorrelationTableFilterValueMaximumString = localStorage.getItem('CorrelationTableFilterValueMaximum');
    this.CorrelationTableFilterValueMaximum = CorrelationTableFilterValueMaximumString !== null ? parseInt(CorrelationTableFilterValueMaximumString) : this.CorrelationTableFilterValueMaximum;

    const meanAritmethicWidthString = localStorage.getItem('meanAritmethicWidth');
    this.meanAritmethicWidth = meanAritmethicWidthString !== null ? parseInt(meanAritmethicWidthString) : this.meanAritmethicWidth;
}






  hexToRGBA(hexValue: string, opacity: number): string {
    const hex = hexValue.replace('#', '');
    const rgbValues = hex.match(/.{1,2}/g)?.map(val => parseInt(val, 16)) ?? [];
    rgbValues.push(opacity);
    return `rgba(${rgbValues.join(',')})`;
  }


  saveConfigChartMain(){
    localStorage.setItem('rankingChartBarColor', this.rankingChartBarColor);
    localStorage.setItem('rankingChartBorderBarColor', this.rankingChartBorderBarColor);
    localStorage.setItem('rankingTypeChart', this.rankingTypeChart);
  }

  restoreConfigChartMain(){
    localStorage.setItem('rankingChartBarColor', '#37A9F5');
    localStorage.setItem('rankingChartBorderBarColor', '#37A9F5');
    localStorage.setItem('rankingTypeChart', 'bar');
  }



  saveConfigPowerTrendLine() {
    localStorage.setItem('powerTrendLineColor', this.powerTrendLineColor);
    localStorage.setItem('powerTrendLineWidth', this.powerTrendLineWidth.toString());

  }   
  restoreConfigPowerTrendLine() {
    localStorage.setItem('powerTrendLineColor', '#fc0841');
    localStorage.setItem('powerTrendLineWidth', (1).toString());

  } 
  
  saveConfigLinearTrendLine() {
    localStorage.setItem('LinearTrendLineColor', this.LinearTrendLineColor);
    localStorage.setItem('linearTrendLineWidth', this.linearTrendLineWidth.toString());

  }   
  restoreConfigLinearTrendLine() {
    localStorage.setItem('LinearTrendLineColor', '#fca708');
    localStorage.setItem('linearTrendLineWidth', (1).toString());

  } 
  
  

  saveConfigLogarithmicTrendLine(){
    localStorage.setItem('logarithmicTrendLineColor', this.logarithmicTrendLineColor);
    localStorage.setItem('logarithmicTrendLineWidth', this.logarithmicTrendLineWidth.toString());
  }

  restoreConfigLogarithmicTrendLine(){
    localStorage.setItem('logarithmicTrendLineColor','#0865fc');
    localStorage.setItem('logarithmicTrendLineWidth',  (1).toString());
  }







  saveConfigExponentialTrendLine(){
    localStorage.setItem('exponentialTrendLineColor', this.exponentialTrendLineColor);
    localStorage.setItem('exponentialTrendLineWidth', this.exponentialTrendLineWidth.toString());
  }
  restoreConfigExponentialTrendLine(){
    localStorage.setItem('exponentialTrendLineColor', '##08fcc7');
    localStorage.setItem('exponentialTrendLineWidth',  (1).toString());
  }
 




  saveConfigCorrelationTable(){
    localStorage.setItem('correlationTableMinimumColor', this.correlationTableMinimumColor);
    localStorage.setItem('correlationTableMaximumColor', this.correlationTableMaximumColor);
    localStorage.setItem('correlationTableFilterColor', this.correlationTableFilterColor);
    localStorage.setItem('correlationTableFilterValueMinimum', this.correlationTableFilterValueMinimum.toString());
    localStorage.setItem('CorrelationTableFilterValueMaximum', this.CorrelationTableFilterValueMaximum.toString());
  }
  restoreConfigCorrelationTable(){
    localStorage.setItem('correlationTableMinimumColor',"rgb(255, 165, 165)");
    localStorage.setItem('correlationTableMaximumColor','rgb(255, 255, 0)');
    localStorage.setItem('correlationTableFilterColor','rgb(255, 165, 165)');
    localStorage.setItem('correlationTableFilterValueMinimum', (1).toString());
    localStorage.setItem('CorrelationTableFilterValueMaximum', (1).toString());
  }
 

  saveConfigOutlier(){
    localStorage.setItem('outlierDeviantMaximumValue', this.outlierDeviantMaximumValue.toString());    
  }
  restoreConfigOutlier(){
    localStorage.setItem('outlierDeviantMaximumValue', (10).toString());    
  }
 
 

  saveConfigMeanAritmethic(){
    localStorage.setItem('meanAritmethicColor', this.meanAritmethicColor);
    localStorage.setItem('meanAritmethicWidth', this.meanAritmethicWidth.toString());
  }
  restoreConfigMeanAritmethic(){
    localStorage.setItem('meanAritmethicColor', '#fc0841');
    localStorage.setItem('meanAritmethicWidth', (1).toString());
  }

 
}
