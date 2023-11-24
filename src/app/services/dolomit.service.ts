import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolomitService {

  private apiUrl = 'assets/json-test-data/all-data.json';

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
