import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorsService } from 'src/app/services/operators.service';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent implements OnInit {
  operators: any[] = [];
row: any;

  constructor(private operatorsService: OperatorsService, private router: Router) { }

  ngOnInit() {
    this.operatorsService.getOperatorsData().subscribe(data => {
      this.operators = data;
    });
  }

  editOperator(row: any) {
    this.operatorsService.setSelectedOperator(row);
    this.router.navigate(['/admin']);
  }
}