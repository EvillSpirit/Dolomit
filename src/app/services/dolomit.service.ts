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


  getAllDataDolomit(): Observable<DataDolomit[]> {
    return this.http.get<any>(this.apiUrl + 'dolomit/data/getAllLastMonth').pipe(
      map(response => {
        const dolomitData: DataDolomit[] = [];
        for (const date in response) {
          if (response.hasOwnProperty(date)) {
            const carriages: DataDolomit[] = response[date];
            dolomitData.push(...carriages);
          }
        }
        return dolomitData;
      })
    );
  }

  updateDataDolomit(data: DataDolomit): Observable<DataDolomit> {
    return this.http.patch<DataDolomit>(this.apiUrl + 'dolomit/data/getAllLastMonth', data)
  }

}
