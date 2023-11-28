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
  originalDolomit: DataDolomit;

  constructor(
    private _fb: FormBuilder,
    private _dolomitService: DolomitService,
    private _dialogRef: MatDialogRef<DataListUpdateComponent, string>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DataDolomit
  ) {
    this.originalDolomit = { ...data };
    this.dolomitForm = this._fb.group({
      id: [data?.id || null],
      zayavleno: [data?.zayavleno || '', [Validators.required, Validators.max(1000)]],
      prinyato: [data?.prinyato || '', [Validators.required, Validators.max(1000)]],
      pogruzheno: [data?.pogruzheno || '', [Validators.required, Validators.max(1000)]]
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