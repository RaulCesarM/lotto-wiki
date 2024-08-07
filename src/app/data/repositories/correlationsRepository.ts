import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CorrelationPlaces } from "src/app/models/correlationPlaces";

@Injectable({ providedIn: 'root' })
export class CorrelationsRepository {

  private endPoint = 'https://localhost:7139/api/LotoFacilCorrelation/'; 

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {      
    return this.http.get<any>(this.endPoint);
  } 
  
  getPlacesData(key: number): Observable<CorrelationPlaces> {      
    return this.http.get<CorrelationPlaces>(`${this.endPoint}places/${key}`);
  } 
}
