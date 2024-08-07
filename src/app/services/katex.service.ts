import { Injectable } from '@angular/core';
import * as katex from 'katex';

@Injectable({
  providedIn: 'root',
})
export class KatexService {
  constructor() {}

  public renderMathExpression(expression: string, element: string) {
    const mathContainer:  HTMLElement | null = document.getElementById(element);
    katex.render(expression, mathContainer as HTMLElement);
    mathContainer?.classList.add('custom-katex-font-size');
  }

  public  getCorrelationFormula(): string {
    return `r = \\frac{n(\\sum xy) - (\\sum x)(\\sum y)}
    {\\sqrt{[n\\sum x^2 - (\\sum x)^2][n\\sum y^2 - (\\sum y)^2]}}`;
  }

  public getSimpleArithmethicMeanFormula(): string {
    return `m = \\frac{x_1 + x_2 + \\ldots + x_{25}}{25}`;
  }

  public getExponentialTrendLineFormula(): string {
    return `{y = a\\cdot e^{bx}},`;
  }

  public getArithmeticTrendLineFormula(): string {
    return ` y = m\\cdot x + b`;
  }

  public getLogarithmicTrendLineFormula() {
    return ` y = A\\cdot \\ln \\cdot(x) + B`;
  }
}