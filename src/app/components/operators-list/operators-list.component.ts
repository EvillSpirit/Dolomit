import { Component, OnInit } from '@angular/core';
import { OperatorsService } from 'src/app/services/operators.service';
import { MatDialog } from '@angular/material/dialog';
import { OperatorAddEditComponent } from '../operator-add-edit/operator-add-edit.component';
import { DataOperator } from 'src/app/interfaces/data-operators';

@Component({
  selector: 'app-operators-list',
  templateUrl: './operators-list.component.html',
  styleUrls: ['./operators-list.component.scss']
})
export class OperatorsListComponent implements OnInit {
  operators: DataOperator[] = [];

  constructor(
    private _operatorService: OperatorsService,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getOperatorsList();
  }

  getOperatorsList() {
    this._operatorService.getOperators().subscribe({
      next: (operators: DataOperator[]) => {
        this.operators = operators;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openOperatorAddEditComponent(operator?: DataOperator) {
    const dialogRef = this._dialog.open(OperatorAddEditComponent, {
      data: operator || null
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'success') {
        this.getOperatorsList();
      }
    });
  }

  deleteOperator(id: number) {
    if (confirm('Вы уверены, что хотите удалить оператора?')) {
      this._operatorService.deleteOperator(id).subscribe({
        next: (val: any) => {
          alert('Оператор успешно удален!');
          this.getOperatorsList();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }
}