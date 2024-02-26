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

  ngOnInit() {

    this.bar = localStorage.getItem('bar') || this.bar;
    this.bordeBar = localStorage.getItem('bordeBar') || this.bordeBar;

    this.barRGBA = this.hexToRGBA(this.bar, 0.5)
    this.borderRGBA = this.hexToRGBA(this.bordeBar, 0.5)
  }

  hexToRGBA(hexValue: string, opacity: number): string {
    const hex = hexValue.replace('#', '');
    const rgbValues = hex.match(/.{1,2}/g)?.map(val => parseInt(val, 16)) ?? [];
    rgbValues.push(opacity);
    return `rgba(${rgbValues.join(',')})`;
  }

  saveConfigMain(){}
  saveConfigChartMain(){
    localStorage.setItem('MainBar', this.bar);
    localStorage.setItem('MainBordeBar', this.bordeBar);
  }

  restoreConfigChartMain(){
    localStorage.setItem('MainBar', this.bar);
    localStorage.setItem('MainBordeBar', this.bordeBar);
  }



  saveConfigPowerTrendLine() {
    localStorage.setItem('TrendLinePowerColor', this.bar);
    localStorage.setItem('TrendLinePowerWidth', this.bordeBar);

  }   
  restoreConfigPowerTrendLine() {
    localStorage.setItem('TrendLinePowerColor', this.bar);
    localStorage.setItem('TrendLinePowerWidth', this.bordeBar);

  } 
  
  

  saveConfigLogarithmicTrendLine(){
    localStorage.setItem('LogarithmicTrendLineColor', this.bar);
    localStorage.setItem('LogarithmicTrendLineWidth', this.bordeBar);
  }

  restoreConfigLogarithmicTrendLine(){
    localStorage.setItem('LogarithmicTrendLineColor', this.bar);
    localStorage.setItem('LogarithmicTrendLineWidth', this.bordeBar);
  }







  saveConfigExponentialTrendLine(){
    localStorage.setItem('ExponentialTrendLineColor', this.bar);
    localStorage.setItem('ExponentialTrendLineWidth', this.bordeBar);
  }
  restoreConfigExponentialTrendLine(){
    localStorage.setItem('ExponentialTrendLineColor', this.bar);
    localStorage.setItem('ExponentialTrendLineWidth', this.bordeBar);
  }
 




  saveConfigCorrelationTable(){
    localStorage.setItem('CorrelationTableMinimum', this.bar);
    localStorage.setItem('CorrelationTableMaximum', this.bordeBar);
    localStorage.setItem('CorrelationTableFilter', this.bordeBar);
    localStorage.setItem('CorrelationTableFilterValueMinimum', this.bordeBar);
    localStorage.setItem('CorrelationTableFilterValueMaximum', this.bordeBar);
  }
  restoreConfigCorrelationTable(){
    localStorage.setItem('CorrelationTableMinimum', this.bar);
    localStorage.setItem('CorrelationTableMaximum', this.bordeBar);
    localStorage.setItem('CorrelationTableFilter', this.bordeBar);
    localStorage.setItem('CorrelationTableFilterValueMinimum', this.bordeBar);
    localStorage.setItem('CorrelationTableFilterValueMaximum', this.bordeBar);
  }
 

  saveConfigOutlier(){
    localStorage.setItem('OutlierDeviantMaximumValue', this.bar);    
  }
  restoreConfigOutlier(){
    localStorage.setItem('OutlierDeviantMaximumValue', this.bar);    
  }
 
 

  saveConfigMeanAritmethic(){
    localStorage.setItem('MeanAritmethicColor', this.bar);
    localStorage.setItem('MeanAritmethicWidth', this.bordeBar);
  }
  restoreConfigMeanAritmethic(){
    localStorage.setItem('MeanAritmethicColor', this.bar);
    localStorage.setItem('MeanAritmethicWidth', this.bordeBar);
  }

 
}
