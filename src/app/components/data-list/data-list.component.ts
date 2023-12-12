import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataDolomit } from 'src/app/interfaces/data-dolomit';
import { DolomitService } from 'src/app/services/dolomit.service';
import { DataListUpdateComponent } from '../data-list-update/data-list-update.component';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  isAdmin: boolean = true;
  dataDolomitList: DataDolomit[] = [];
  groupedData: { date: string, carriages: DataDolomit[] }[] = [];
  carriageTypes: { id: number, type: string, description: string }[] = [];
  carriageTypeOrder = ['ЦС ЦМВ', 'ХП', 'ПВ(инв.)'];
  sortedGroupedData: { date: string, carriages: DataDolomit[] }[] = [];

  constructor(private dolomitService: DolomitService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dolomitService.getAllDataDolomit().subscribe(
      (data: DataDolomit[]) => {
        this.dataDolomitList = data;
        this.extractCarriageTypes();
        this.groupDataByDate();
      }
    );
  }

  groupDataByDate() {
    const groupedDataMap = new Map<string, DataDolomit[]>();
  
    for (const data of this.dataDolomitList) {
      const dateParts = data.dateCreated.split('-');
      const year = parseInt(dateParts[2], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Вычитаем 1, так как месяцы в объекте Date начинаются с 0
      const day = parseInt(dateParts[0], 10);
  
      const date = new Date(year, month, day);
  
      const formattedDate = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-');
  
      if (groupedDataMap.has(formattedDate)) {
        groupedDataMap.get(formattedDate)?.push(data);
      } else {
        groupedDataMap.set(formattedDate, [data]);
      }
    }
  
    this.groupedData = Array.from(groupedDataMap.entries()).map(([date, carriages]) => ({ date, carriages }));
  
    // Сортировка по дате
    this.groupedData.sort((a, b) => new Date(b.date.replace(/-/g, '/')).getTime() - new Date(a.date.replace(/-/g, '/')).getTime());
  }

  extractCarriageTypes() {
    const types: { id: number, type: string, description: string }[] = [];

    for (const data of this.dataDolomitList) {
      const carriageType = data.carriageType;

      if (!types.find(type => type.id === carriageType.id)) {
        types.push(carriageType);
      }
    }

    this.carriageTypes = types;
  }

  openDataListUpdateComponent(data?: { date: string, carriages: DataDolomit[] }) {
    const dialogRef = this._dialog.open(DataListUpdateComponent, {
      data: data || null
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'success') {
        this.loadData();
      }
    });
  }
}