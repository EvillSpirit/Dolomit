import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperatorsService } from 'src/app/services/operators.service';
import { OperatorAddEditComponent } from '../operator-add-edit/operator-add-edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent implements OnInit {
  operators: any[] = [];
  row: any;

  constructor(private operatorsService: OperatorsService, private router: Router, private dialog: MatDialog, private _operatorService: OperatorsService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  openOperatorAddEditComponent() {
    this.dialog.open(OperatorAddEditComponent);
  }
}