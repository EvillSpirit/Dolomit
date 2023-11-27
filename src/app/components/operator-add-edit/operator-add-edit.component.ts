import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperatorsService } from 'src/app/services/operators.service';

@Component({
  selector: 'app-operator-add-edit',
  templateUrl: './operator-add-edit.component.html',
  styleUrls: ['./operator-add-edit.component.scss']
})
export class OperatorAddEditComponent {
  operatorForm: FormGroup;

  status: string[] = [
    'Активный',
    'Неактивный',
    'Смена пароля'
  ];

  role: string[] = [
    'Администратор',
    'Оператор'
  ];

  constructor(private _fb: FormBuilder, private _operatorService: OperatorsService, private _dialogRef: DialogRef<OperatorAddEditComponent>) {
    this.operatorForm = this._fb.group({
      name: '',
      email: '',
      role: '',
      status: '',
    })
  }

  onFormSubmit() {
    if(this.operatorForm.valid) {
      this._operatorService.addOperator(this.operatorForm.value).subscribe({
        next: (val: any) => {
          alert('Оператор успешно добавлен!');
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        }
      })
    }
  }
}
