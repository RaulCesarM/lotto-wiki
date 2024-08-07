import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LunationRepository {

  private endPoint = 'https://localhost:7139/api/LotoFacilLunation/';

  constructor(private http: HttpClient) {}

  getNewMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Nova`);
  }

  getCrescentMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Crescente`);
  }

  getQuarterCrescenteMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}QuartoCrescente`);
  }
  
  getGibbousCrescentMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}GibosaCrescente`);
  }

  getFullMoon(): Observable<any> {  
    return this.http.get<any>(`${this.endPoint}Cheia`);
  } 

  getGibbousWaningMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}GibosaMinguante`);
  }

  getQuarterWanningMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}QuartoMinguante`);
  }
  getWaningMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Minguante`);
  }

}
