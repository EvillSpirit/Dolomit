import { Component, OnInit } from '@angular/core';
import { DataDolomit } from 'src/app/interfaces/data-dolomit';
import { DolomitService } from 'src/app/services/dolomit.service';

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

  constructor(private dolomitService: DolomitService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dolomitService.getAllDataDolomit().subscribe(
      (data: DataDolomit[]) => {
        this.dataDolomitList = data;
        this.groupDataByDate();
        this.extractCarriageTypes();
      }
    );
  }

  groupDataByDate() {
    const groupedDataMap = new Map<string, DataDolomit[]>();

    for (const data of this.dataDolomitList) {
      const date = data.dateCreated;

      if (groupedDataMap.has(date)) {
        groupedDataMap.get(date)?.push(data);
      } else {
        groupedDataMap.set(date, [data]);
      }
    }

    this.groupedData = Array.from(groupedDataMap.entries()).map(([date, carriages]) => ({ date, carriages }));
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

}