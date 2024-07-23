import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-explanation-rankings',
  templateUrl: './explanation-rankings.component.html',
  styleUrls: ['./explanation-rankings.component.css']
})
export class ExplanationRankingsComponent{

  constructor( private elRef: ElementRef) {}

  ngAfterViewInit() {
    const canvas = this.elRef.nativeElement.querySelector('#canvas') as HTMLCanvasElement;
    if (canvas && canvas.parentElement) {
      canvas.width = canvas.parentElement.clientWidth;
    }
  }

}
