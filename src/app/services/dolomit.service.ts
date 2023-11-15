import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dolomit } from '../moles/dolomit';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DolomitService {

  //private apiUrl = environment.apiPath + '/api/v1/dolomit';
  private apiUrl = 'assets/json-test-data/all-data.json';

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
