import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { DataDolomit } from '../interfaces/data-dolomit';

@Injectable({
  providedIn: 'root'
})
export class DolomitService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAllDataDolomit(): Observable<any> {
    return this.http.get('http://localhost:3000/dolomit');
  }

  updateDataDolomit(data: DataDolomit): Observable<DataDolomit> {
    return this.http.patch<DataDolomit>(this.apiUrl + 'dolomit/data/getAllLastMonth', data)
  }

}
