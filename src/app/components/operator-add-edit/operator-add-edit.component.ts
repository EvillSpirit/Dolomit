import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperatorsService } from 'src/app/services/operators.service';
import { Router } from '@angular/router';
import { DataOperator } from 'src/app/interfaces/data-operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-operator-add-edit',
  templateUrl: './operator-add-edit.component.html',
  styleUrls: ['./operator-add-edit.component.scss']
})
export class OperatorAddEditComponent {
  operatorForm: FormGroup;
  originalOperator: DataOperator;
  isEditMode: boolean = false;

  status: string[] = [
    'Активный',
    'Неактивный',
    'Смена пароля'
  ];

  role: string[] = [
    'Администратор',
    'Оператор'
  ];

  constructor(
    private _fb: FormBuilder,
    private _operatorService: OperatorsService,
    private _dialogRef: MatDialogRef<OperatorAddEditComponent, string>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DataOperator
  ) {
    this.originalOperator = { ...data };
    this.operatorForm = this._fb.group({
      id: [data?.id || null],
      name: [data?.name || '', [Validators.required, Validators.minLength(5)]],
      email: [data?.email || '', [Validators.required, Validators.email]],
      role: [data?.role || '', Validators.required],
      status: [data?.status || '', Validators.required]
    });
    this.isEditMode = !!data?.id;
  }

  onFormSubmit() {
    if (this.operatorForm.valid) {
      if (this.operatorForm.value.id) {
        this._operatorService.updateOperator(this.operatorForm.value).subscribe({
          next: (val: any) => {
            if (this.isEditMode) {
              alert('Оператор успешно обновлен!');
            } else {
              alert('Оператор успешно добавлен!');
            }
            this._dialogRef.close('success');
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._operatorService.addOperator(this.operatorForm.value).subscribe({
          next: (val: any) => {
            alert('Оператор успешно добавлен!');
            this._dialogRef.close('success');
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }

  onCancel() {
    if (this.operatorForm.dirty) {
      if (confirm('Вы уверены, что хотите отменить внесенные изменения?')) {
        if (this.isEditMode) {
          this.operatorForm.patchValue(this.originalOperator);
        } else {
          this._dialogRef.close();
        }
      }
    } else {
      this._dialogRef.close();
    }
  }
}