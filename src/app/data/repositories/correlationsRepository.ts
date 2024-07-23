import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";


@Injectable({ providedIn: 'root' })
export class CorrelationsRepository {

  constructor(private http: HttpClient) {}

  private endPoint = 'https://localhost:7139/api/LotoFacilCorrelation/'; 

  getData(): Observable<any> {    
    return this.http.get<any>(this.endPoint);
  } 

}