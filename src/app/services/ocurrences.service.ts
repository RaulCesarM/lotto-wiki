import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { firstValueFrom } from "rxjs";
import { OcurrencesRepository } from "../data/repositories/ocurrencesRepository";

@Injectable({
  providedIn: 'root'
})
export class OcurrencesService {

  dataArray: number[] = []

  constructor(private repository: OcurrencesRepository, private loading: LoadingService) {}

  async loadData(): Promise<void> {
    this.loading.loadingOn();
    try {
      this.dataArray = await firstValueFrom(this.repository.getData());
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.loading.loadingOff();
    }
  }

  getData(): number[] {
    return this.dataArray
  }

}