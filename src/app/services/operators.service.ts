import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {

  constructor(private _http: HttpClient) {}

  addOperator(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/operators', data);
  } 

  getOperators(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/operators');
  }

  deleteOperator(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/operators/${id}`);
  }

  updateOperator(data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/operators/${data.id}`, data);
  }
}