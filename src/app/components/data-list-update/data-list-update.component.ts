import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDolomit } from 'src/app/interfaces/data-dolomit';
import { DolomitService } from 'src/app/services/dolomit.service';


@Component({
  selector: 'app-data-list-update',
  templateUrl: './data-list-update.component.html',
  styleUrls: ['./data-list-update.component.scss']
})
export class DataListUpdateComponent {
  dolomitForm: FormGroup;
  originalDolomit: { date: string, carriages: DataDolomit[] };
  carriageTypeOrder = ['ЦС ЦМВ', 'ХП', 'ПВ(инв.)'];

  constructor(
    private _fb: FormBuilder,
    private _dolomitService: DolomitService,
    private _dialogRef: MatDialogRef<DataListUpdateComponent, string>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { date: string, carriages: DataDolomit[] }
  ) {
    this.originalDolomit = { ...data };
    this.dolomitForm = this._fb.group({
      id1: [data.carriages[0].id || null],
      zayavleno1: [data.carriages[0].zayavleno || '', [Validators.required, Validators.max(1000)]],
      prinyato1: [data.carriages[0].prinyato || '', [Validators.required, Validators.max(1000)]],
      pogruzheno1: [data.carriages[0].pogruzheno || '', [Validators.required, Validators.max(1000)]],
      type1: [data.carriages[0].carriageType.type|| '', [Validators.required, Validators.max(1000)]],
      zayavleno2: [data.carriages[1].zayavleno || '', [Validators.required, Validators.max(1000)]],
      prinyato2: [data.carriages[1].prinyato || '', [Validators.required, Validators.max(1000)]],
      pogruzheno2: [data.carriages[1].pogruzheno || '', [Validators.required, Validators.max(1000)]],
      type2: [data.carriages[1].carriageType.type|| '', [Validators.required, Validators.max(1000)]],
      zayavleno3: [data.carriages[2].zayavleno || '', [Validators.required, Validators.max(1000)]],
      prinyato3: [data.carriages[2].prinyato || '', [Validators.required, Validators.max(1000)]],
      pogruzheno3: [data.carriages[2].pogruzheno || '', [Validators.required, Validators.max(1000)]],
      type3: [data.carriages[2].carriageType.type|| '', [Validators.required, Validators.max(1000)]],
    });
  }
  
  title = 'angular-key-press-example';
  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}