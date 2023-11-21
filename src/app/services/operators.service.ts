import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  
  private selectedOperator: any = null;

  setSelectedOperator(operator: any) {
    this.selectedOperator = operator;
  }

  getSelectedOperator() {
    return this.selectedOperator;
  }

  getData(): any[] {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  getOperatorsData() {
    return this.http.get<any[]>('assets/json-test-data/adminData.json');
  }
}