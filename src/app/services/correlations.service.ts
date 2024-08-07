import { Injectable } from '@angular/core';
import { CorrelationsRepository } from '../data/repositories/correlationsRepository';
import { firstValueFrom } from 'rxjs';
import { LoadingService } from './loading.service';
import { CorrelationPlaces } from '../models/correlationPlaces';

@Injectable({
  providedIn: 'root'
})
export class CorrelationsService {

  matrix: number[][] = [];

  constructor(
    private repository: CorrelationsRepository) {}

 async getData():Promise< number[][]> {
    return await firstValueFrom(this.repository.getData());
  }

  async getPlacesData(target: number): Promise<CorrelationPlaces> {   
      const data = await firstValueFrom(this.repository.getPlacesData(target));
      return data;  
  }
}
