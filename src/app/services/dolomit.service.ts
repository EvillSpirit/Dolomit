import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { DataDolomit } from '../interfaces/data-dolomit';

@Injectable({
  providedIn: 'root',
})
export class DolomitService {
  constructor(private http: HttpClient) {}

  getAllDataDolomit(): Observable<any> {
    return this.http.get('http://localhost:3000/dolomit/');
  }

  // updateDataDolomit(data: DataDolomit): Observable<DataDolomit> {
  //   return this.http.put<DataDolomit>(`http://localhost:3000/dolomit/${data.id}`, data);
  // }

  updateDataDolomit(data: DataDolomit[]): Observable<DataDolomit[]> {
    const updateRequests = data.map((item) => {
      return this.http.put<DataDolomit>(
        `http://localhost:3000/dolomit/${item.id}`,
        item
      );
    });

    return forkJoin(updateRequests);
  }

  createdDataDolomit(data: DataDolomit[]): Observable<DataDolomit[]> {
    const createdRequests = data.map((item) => {
      return this.http.post<DataDolomit>(
        `http://localhost:3000/dolomit/`,
        item
      );
    });

    return forkJoin(createdRequests);
  }
}
