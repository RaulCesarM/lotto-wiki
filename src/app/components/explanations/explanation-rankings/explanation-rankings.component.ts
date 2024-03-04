import { Component, ElementRef, OnInit } from '@angular/core';
import { EquationsService } from 'src/app/services/equations.service';
import { KatexService } from 'src/app/services/katex.service';

@Component({
  selector: 'app-explanation-rankings',
  templateUrl: './explanation-rankings.component.html',
  styleUrls: ['./explanation-rankings.component.css']
})
export class ExplanationRankingsComponent implements OnInit{



  constructor(
    private elRef: ElementRef,
    private katexService: KatexService,
    private mathService: EquationsService,

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
    this.katexService.renderMathExpression(tendencyExpression,'linhaTendenciaFormula');

  }


}
