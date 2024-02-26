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

  saveConfigMain() {
    localStorage.setItem('bar', this.bar);
    localStorage.setItem('bordeBar', this.bordeBar);

  }

  saveConfigLinear(){
    localStorage.setItem('barLinear', this.bar);
    localStorage.setItem('bordeBarLienar', this.bordeBar);
  }
  hexToRGBA(hexValue: string, opacity: number): string {
    const hex = hexValue.replace('#', '');
    const rgbValues = hex.match(/.{1,2}/g)?.map(val => parseInt(val, 16)) ?? [];
    rgbValues.push(opacity);
    return `rgba(${rgbValues.join(',')})`;
  }

}
