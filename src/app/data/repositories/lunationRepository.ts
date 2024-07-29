import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LunationRepository {

  private endPoint = 'https://localhost:7139/api/LotoFacilLunation/';

  constructor(private http: HttpClient) {}

  getCrescentMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Crescente`);
  }

  getFullMoon(): Observable<any> {  
    return this.http.get<any>(`${this.endPoint}cheia`);
  }

  getNewMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Nova`);
  }

  getWaningMoons(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}Minguante`);
  }

  getQuarterCrescenteMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}QuartoCrescente`);
  }

  getGibbousCrescentMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}GibosaCrescente`);
  }

  getGibbousWaningMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}GibosaMinguante`);
  }

  getQuarterWanningMoon(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}QuartoMinguante`);
  }
}
