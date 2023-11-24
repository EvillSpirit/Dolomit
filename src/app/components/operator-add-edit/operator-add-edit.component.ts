import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
    this.operatorForm = this._fb.group({
      name: '',
      email: '',
      role: '',
      status: '',
    })
  }

  onFormSubmit() {
    if(this.operatorForm.valid) {
      console.log(this.operatorForm.value)
    }
  }
}
