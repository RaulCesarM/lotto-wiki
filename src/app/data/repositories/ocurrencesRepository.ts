import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OcurrencesRepository {

  constructor(private http: HttpClient) {}

  private endPoint = 'https://localhost:7139/api/LotoFacilOcurrences'; 

  getData(): Observable<any> {      
    return this.http.get<any>(this.endPoint);
  } 

}