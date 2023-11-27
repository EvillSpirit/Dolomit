import { Component, OnInit } from '@angular/core';
import { DataDolomit } from 'src/app/interfaces/data-dolomit';
import { DolomitService } from 'src/app/services/dolomit.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  isAdmin: boolean = true;
  dataDolomitList: DataDolomit[] = [];
  groupedData: DataDolomit[][] = [];
  //groupedData: any[] = [];

  constructor(private dolomitService: DolomitService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.dolomitService.getAllDataDolomit().subscribe(
      (data: DataDolomit[]) => {
        this.dataDolomitList = data;
        this.groupDataByDate();
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

    this.groupedData = Array.from(groupedDataMap.values());
  }

}