import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { LunationRepository } from "../data/repositories/lunationRepository";
import { firstValueFrom } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LunationService {

  labelsDataSource = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25']


  newMoon = [];
  crescentMoon = [];
  quarterCrescentMoon = []
  gibousCrescentMoon = [];
  fullMoon = [];
  gibousWaningMoon = [];
  quarterWaningMoon = []
  waningMoon = [];

  constructor(private loading: LoadingService, private repository: LunationRepository) {}


  async loadData(): Promise<void> {
    this.loading.loadingOn();
    try {
      this.fullMoon = await firstValueFrom(this.repository.getFullMoon());
      this.newMoon = await firstValueFrom(this.repository.getNewMoon());
      this.crescentMoon = await firstValueFrom(this.repository.getCrescentMoon());
      this.waningMoon = await firstValueFrom(this.repository.getWaningMoons());
      this.quarterCrescentMoon = await firstValueFrom(this.repository.getQuarterCrescenteMoon());
      this.quarterWaningMoon = await firstValueFrom(this.repository.getGibbousWaningMoon());
      this.gibousCrescentMoon = await firstValueFrom(this.repository.getGibbousCrescentMoon());
      this.gibousWaningMoon = await firstValueFrom(this.repository.getGibbousWaningMoon());

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.loading.loadingOff();
    }
  }

  getFullMoon() {
    return this.fullMoon
  }

  getNewMoon(): number[] {
    return this.newMoon
  }

  getCrescentMoon(): number[] {
    return this.crescentMoon
  }

  getWaningMoons(): number[] {
    return this.waningMoon
  }

  getQuarterCrescentMoon(): number[] {
    return this.quarterCrescentMoon
  }

  getQuarterWaningMoon(): number[] {
    return this.quarterWaningMoon
  }

  getGibousCrescentMoon(): number[] {
    return this.gibousCrescentMoon
  }

  getGibousWaningMoon(): number[] {
    return this.gibousWaningMoon
  }

}



