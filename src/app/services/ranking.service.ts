import { Injectable } from '@angular/core';
import { OverdueRepository } from '../data/repositories/overdueRepository';
import { LoadingService } from './loading.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingService  {

  constructor() { }


  labelsDataSource =['1','2', '3','4', '5','6','7','8','9','10','11', '12', '13', '14', '15', '16','17', '18', '19', '20','21', '22', '23', '24', '25']

  baseDataSource =  [12, 19, 43, 5, 2, 3, 19, 31,  5, 21, 13, 19, 3, 5, 12, 23, 19, 23, 52, 12, 23, 19, 33, 25, 8 ]

  heavyDataSource=  [ 9, 10, 23, 3, 2, 2, 10, 25,  3, 11, 10, 14, 3, 3, 7,  20, 10, 15, 42,  7, 13, 10, 23, 15, 5 ]

  lightDataSource = [ 3,  9, 20, 2, 0, 1 , 9,  6,  2, 10,  3,  5, 0, 2, 5,   3,  9,  7, 10,  5, 10, 9 , 10, 10, 3 ]


}
