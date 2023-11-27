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

    getOperator(): Observable<any> {
      return this._http.get('http://localhost:3000/operators');
    } 
}