import { Component, OnInit } from '@angular/core';
import { DolomitService } from 'src/app/services/dolomit.service';
import { Records } from '../../interfaces/data-dolomit';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  records: Records[] = [];
  isAdmin: boolean = true;

  constructor(private dolomitService: DolomitService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/json-test-data/all-data.json').subscribe(
      response => {
        const recordsMap = new Map<string, Records[]>();
  
        for (let key in response) {
          const date = new Date(key).toLocaleDateString('ru-RU');
          const records = response[key] as Records[];
  
          if (!recordsMap.has(date)) {
            recordsMap.set(date, records);
          } else {
            const existingRecords = recordsMap.get(date) as Records[];
            recordsMap.set(date, existingRecords.concat(records));
          }
        }
  
        this.records = Array.from(recordsMap.values()).flat();
      },
      error => {
        console.error('Ошибка при получении данных', error);
      }
    );
  }
}