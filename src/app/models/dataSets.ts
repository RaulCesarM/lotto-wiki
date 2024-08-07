import { ChartType } from "chart.js";

export class DataSets {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  type: ChartType;
  pointRadius: number = 1

  constructor(
    label: string = '',
    data: number[] = [],
    backgroundColor: string = '',
    borderColor: string = '',
    borderWidth: number = 1,
    fill: boolean = false,
    type: ChartType = 'bar',
    pointRadius: number = 1
  ) {
    this.label = label;
    this.data = data;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
    this.fill = fill;
    this.type = type;
    this.pointRadius = pointRadius;
  }
}
