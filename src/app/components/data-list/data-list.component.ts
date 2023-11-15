import { Component } from '@angular/core';
import { DolomitService } from 'src/app/services/dolomit.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent {
  records?: any[]

  constructor(private dolomitService: DolomitService){

  }

  ngOnInit(): void{
    this.dolomitService.getAllRecords().subscribe(
      responce => {
        this.records = responce.records
      },
      error => {
        console.error('Ошибка при получении данных', error)
      }
    )
  }

  calculateTotal(column: string): number {
    if (!this.records) return 0;

    let total = 0;

    for (const record of this.records) {
      total += record[column] || 0;
    }

    return total;
  }
}
