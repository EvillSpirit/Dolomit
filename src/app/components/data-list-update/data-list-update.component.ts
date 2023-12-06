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
    this.dolomitForm = this._fb.group({});
    
    for (let i = 0; i < data.carriages.length; i++) {
      const carriage = data.carriages[i];
    
      this.dolomitForm.addControl(`id${i + 1}`, this._fb.control(carriage.id || null));
      this.dolomitForm.addControl(
        `zayavleno${i + 1}`,
        this._fb.control(carriage.zayavleno || '', [Validators.required, Validators.max(1000)])
      );
      this.dolomitForm.addControl(
        `prinyato${i + 1}`,
        this._fb.control(carriage.prinyato || '', [Validators.required, Validators.max(1000)])
      );
      this.dolomitForm.addControl(
        `pogruzheno${i + 1}`,
        this._fb.control(carriage.pogruzheno || '', [Validators.required, Validators.max(1000)])
      );
      this.dolomitForm.addControl(
        `type${i + 1}`,
        this._fb.control(carriage.carriageType?.type || '', [Validators.required, Validators.max(1000)])
      );
    }
  }

  createSubmit() {
    if (this.dolomitForm.valid) {
      const formData = this.dolomitForm.value;
      const updatedData: DataDolomit[] = [];
  
      for (let i = 0; i < this.originalDolomit.carriages.length; i++) {
        const originalCarriage = this.originalDolomit.carriages[i];
  
        updatedData.push({
          id: originalCarriage.id,
          dateCreated: originalCarriage.dateCreated,
          plusMinusPrinyato: originalCarriage.plusMinusPrinyato,
          zayavleno: formData[`zayavleno${i + 1}`] || originalCarriage.zayavleno,
          prinyato: formData[`prinyato${i + 1}`] || originalCarriage.prinyato,
          pogruzheno: formData[`pogruzheno${i + 1}`] || originalCarriage.pogruzheno,
          carriageType: {
            type: originalCarriage.carriageType.type,
            id: originalCarriage.carriageType.id,
            description: originalCarriage.carriageType.description,
          }
        });
      }
  
      this._dolomitService.updateDataDolomit(updatedData).subscribe({
        next: (val: DataDolomit[]) => {
          alert("Success");
          this._dialogRef.close("success");
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
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