import { Injectable } from "@angular/core";
import { OverdueRepository } from "../data/repositories/overdueRepository";
import { LoadingService } from "./loading.service";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OverdueService {

  constructor(private repository: OverdueRepository, private loading: LoadingService) {}

  async getData(): Promise< number[]> {
    return await firstValueFrom(this.repository.getData());
  }

}