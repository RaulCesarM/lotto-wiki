import { Injectable } from "@angular/core";
import { LunationRepository } from "../data/repositories/lunationRepository";
import { firstValueFrom } from "rxjs";
import { DataSets } from "../models/dataSets";
import { ChartTypeRegistry } from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class LunationService {

  private ocurrencesDataSet = new DataSets();
  private avaregeDataSet = new DataSets();
  private type: string = 'bar';

  public labelsDataSource = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']

  constructor( private repository: LunationRepository) {}

  public async getNewMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getNewMoon());
  }

  public async getCrescentMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getCrescentMoon());
  }

  public async getQuarterCrescentMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getQuarterCrescenteMoon());
  }

  public async getGibbousCrescentMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getGibbousCrescentMoon());
  }

  public async getFullMoon() {
    return await firstValueFrom(this.repository.getFullMoon());
  }
  public async getGibbousWaningMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getGibbousWaningMoon());
  }

  public async getQuarterWaningMoon(): Promise<number[]> {
    return await firstValueFrom(this.repository.getQuarterWanningMoon());
  }
  public async getWaningMoons(): Promise<number[]> {
    return await firstValueFrom(this.repository.getWaningMoon());
  }

  public async GetDataSets(): Promise<DataSets[]> {
    await this.populateDataSets();
    let dataSets: DataSets[] = [this.ocurrencesDataSet, this.avaregeDataSet]
    return dataSets
  }

  public async populateDataSets(): Promise<void> {
    this.ocurrencesDataSet = new DataSets(
      'Ocorrencias',
      await this.getFullMoon(),
      'rgba(55, 169, 245,0.5)',
      'rgba(75, 192, 192, 1)',
      1,
      false,
      (this.type as keyof ChartTypeRegistry) || 'bar',
      5
    );

    this.avaregeDataSet = new DataSets(
      'Média',
      [],
      'rgba(55, 169, 245,0.5)',
      'rgba(75, 192, 192, 1)',
      1,
      false,
      'line'
    );
  }

  public async saveTypeService(selectedValue: string): Promise<void> {
    if (selectedValue === 'line') {
      this.type = 'line';
    } if (selectedValue === 'bar') {
      this.type = 'bar';
    } if (selectedValue === 'bubble') {
      this.type = 'bubble';
    }
    await this.populateDataSets()

  }
}
