import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-configurations',
  templateUrl: './pages-configurations.component.html',
  styleUrls: ['./pages-configurations.component.css']
})
export class PagesConfigurationsComponent implements OnInit {

  bar: string = '#37A9F5';
  bordeBar: string = '#37A9F5';
  barRGBA: string ='';
  borderRGBA: string ='';

  espessura: number =1;

  tipoGraficoSelecionado: string = '';




  /////////////////////////////////////////////////

  mainBar: string='#fc08f4';
  mainBordeBar: string ='#fc08f4';
  mainTypeChart: string ='bar'

//falta o tipo de grafico

////

  trendLinePowerColor:string ='#fc08f4';
  trendLinePowerWidth: number = 1;

  trendLineLinearColor: string = '#fca708'
  trendLineLinearWidth:number =1
  
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

    this.mainBar = localStorage.getItem('mainBar') || this.mainBar;
    this.mainBordeBar = localStorage.getItem('mainBordeBar') || this.mainBordeBar;
    this.mainTypeChart = localStorage.getItem('mainTypeChart') || this.mainTypeChart;

    this.barRGBA = this.hexToRGBA(this.bar, 0.5)
    this.borderRGBA = this.hexToRGBA(this.bordeBar, 0.5)

    this.trendLinePowerColor = localStorage.getItem('trendLinePowerColor') || this.trendLinePowerColor;   
    this.trendLineLinearColor = localStorage.getItem('trendLineLinearColor') || this.trendLineLinearColor;
    this.logarithmicTrendLineColor = localStorage.getItem('logarithmicTrendLineColor') || this.logarithmicTrendLineColor;
    this.exponentialTrendLineColor = localStorage.getItem('exponentialTrendLineColor') || this.exponentialTrendLineColor;
    this.correlationTableMinimumColor = localStorage.getItem('correlationTableMinimumColor') || this.correlationTableMinimumColor;
    this.correlationTableMaximumColor = localStorage.getItem('correlationTableMaximumColor') || this.correlationTableMaximumColor;
    this.correlationTableFilterColor = localStorage.getItem('correlationTableFilterColor') || this.correlationTableFilterColor;
    this.meanAritmethicColor = localStorage.getItem('meanAritmethicColor') || this.meanAritmethicColor;

    this. converterEmNumero()

  }

  converterEmNumero() {
    const trendLinePowerWidthString = localStorage.getItem('trendLinePowerWidth');
    this.trendLinePowerWidth = trendLinePowerWidthString !== null ? parseInt(trendLinePowerWidthString) : this.trendLinePowerWidth;

    const trendLineLinearWidthString = localStorage.getItem('trendLineLinearWidth');
    this.trendLineLinearWidth = trendLineLinearWidthString !== null ? parseInt(trendLineLinearWidthString) : this.trendLineLinearWidth;

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
    localStorage.setItem('mainBar', this.mainBar);
    localStorage.setItem('mainBordeBar', this.mainBordeBar);
    localStorage.setItem('mainTypeChart', this.mainTypeChart);
  }

  restoreConfigChartMain(){
    localStorage.setItem('mainBar', '#37A9F5');
    localStorage.setItem('mainBordeBar', '#37A9F5');
    localStorage.setItem('mainTypeChart', 'bar');
  }



  saveConfigPowerTrendLine() {
    localStorage.setItem('trendLinePowerColor', this.trendLinePowerColor);
    localStorage.setItem('trendLinePowerWidth', this.trendLinePowerWidth.toString());

  }   
  restoreConfigPowerTrendLine() {
    localStorage.setItem('trendLinePowerColor', '#fc0841');
    localStorage.setItem('trendLinePowerWidth', (1).toString());

  } 
  
  saveConfigLinearTrendLine() {
    localStorage.setItem('trendLineLinearColor', this.trendLineLinearColor);
    localStorage.setItem('trendLinePowerWidth', this.trendLinePowerWidth.toString());

  }   
  restoreConfigLinearTrendLine() {
    localStorage.setItem('trendLineLinearColor', '#fca708');
    localStorage.setItem('trendLineLinearWidth', (1).toString());

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
