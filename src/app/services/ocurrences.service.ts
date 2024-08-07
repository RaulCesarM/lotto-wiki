import { Injectable } from "@angular/core";
import { LoadingService } from "./loading.service";
import { firstValueFrom } from "rxjs";
import { OcurrencesRepository } from "../data/repositories/ocurrencesRepository";

@Injectable({
  providedIn: 'root'
})
export class OcurrencesService {

  constructor(private repository: OcurrencesRepository, private loading: LoadingService) {}

 public async getData(): Promise< number[]> {
    return await firstValueFrom(this.repository.getData());
  }

}