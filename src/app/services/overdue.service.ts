import { Injectable } from "@angular/core";
import { OverdueRepository } from "../data/repositories/overdueRepository";
import { LoadingService } from "./loading.service";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverdueService {

  dataArray: number[] = []

  constructor(private repository: OverdueRepository, private loading: LoadingService) {}

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