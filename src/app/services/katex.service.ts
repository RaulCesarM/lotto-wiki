import { Injectable } from '@angular/core';
import * as katex from 'katex';

@Injectable({
  providedIn: 'root',
})
export class KatexService {
  constructor() {}

  renderMathExpression(expression: string, element: string) {
    const mathContainer = document.getElementById(element);
    katex.render(expression, mathContainer as HTMLElement);
    mathContainer?.classList.add('custom-katex-font-size');
  }

  getCorrelationFormula(): string {
    return `r = \\frac{n(\\sum xy) - (\\sum x)(\\sum y)}
    {\\sqrt{[n\\sum x^2 - (\\sum x)^2][n\\sum y^2 - (\\sum y)^2]}}`;
  }

  getSimpleArithmethicMeanFormula(): string {
    return `m = \\frac{x_1 + x_2 + \\ldots + x_{25}}{25}`;
  }

  getExponentialTrendLineFormula(): string {
    return `
   {y = ae^{bx}},
    \\quad b = \\frac{{\\ln\\left(\\frac{{\\text{{data}}[\\text{{data.length}} - 1]}}{{a}}\\right)}}{{\\text{{data.length}} - 1}},
    \\quad\\text{{tl-exp}}[i] = a \\cdot e^{b \\cdot i}
    `;
  }

  getArithmeticTrendLineFormula(): string {
    return `
    y = mx + b,
    \\quad m = \\frac{{n \\sum xy - \\sum x \\sum y}}{{n \\sum x^2 - (\\sum x)^2}},
    \\quad b = \\frac{{\\sum y - m \\sum x}}{{n}},
    \\quad \\text{{tl-arith}}[i] = m (i + 1) + b
    `;
  }

  getLogarithmicTrendLineFormula(): string {
    return `
    y = A \ln(x) + B,
    \\quad A = \\frac{{n \\sum (\\ln(x) \\cdot y) - \\sum(\\ln(x)) \\cdot \\sum y}}{{n \\sum (\\ln(x))^2 - (\\sum(\\ln(x)))^2}},
    \\quad B = \\frac{{\\sum y - A \\sum \\ln(x)}}{{n}},
    \\quad \\text{{tl-log}}[i] = A \ln(i + 1) + B
    `;
}



}
