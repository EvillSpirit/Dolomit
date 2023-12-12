import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataDolomit } from 'src/app/interfaces/data-dolomit';
import { DolomitService } from 'src/app/services/dolomit.service';



@Component({
  selector: 'app-data-list-update',
  templateUrl: './data-list-update.component.html',
  styleUrls: ['./data-list-update.component.scss'],
})
export class DataListUpdateComponent {
  dolomitForm: FormGroup;
  originalDolomit: { date: string; carriages: DataDolomit[] };
  carriageTypeOrder = ['ЦС ЦМВ', 'ХП', 'ПВ(инв.)'];
  isEditMode: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private _dolomitService: DolomitService,
    private dialogRef: MatDialogRef<DataListUpdateComponent>,
    private _dialogRef: MatDialogRef<DataListUpdateComponent, string>,
    private router: Router,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { date: string; carriages: DataDolomit[] }

    
  ) {
    if (data?.carriages) {
      data.carriages.sort((a, b) => {
        const typeA = a.carriageType.type;
        const typeB = b.carriageType.type;
        return this.carriageTypeOrder.indexOf(typeA) - this.carriageTypeOrder.indexOf(typeB);
      });
    }

    this.originalDolomit = { ...data };
    this.dolomitForm = this._fb.group({});

    for (let i = 0; i < 3; i++) {
      this.dolomitForm.addControl(
        `id${i + 1}`,
        this._fb.control(null)
      );
      this.dolomitForm.addControl(
        `zayavleno${i + 1}`,
        this._fb.control('', [
          Validators.required,
          Validators.max(1000),
        ])
      );
      this.dolomitForm.addControl(
        `prinyato${i + 1}`,
        this._fb.control('', [
          Validators.required,
          Validators.max(1000),
        ])
      );
      this.dolomitForm.addControl(
        `pogruzheno${i + 1}`,
        this._fb.control('', [
          Validators.required,
          Validators.max(1000),
        ])
      );
    }

    for (let i = 0; i < data?.carriages?.length; i++) {
      const carriage = data.carriages[i];

      this.dolomitForm.setControl(
        `id${i + 1}`,
        this._fb.control(carriage.id || null)
      );
      this.dolomitForm.setControl(
        `zayavleno${i + 1}`,
        this._fb.control(carriage.zayavleno || '', [
          Validators.required,
          Validators.max(1000),
        ])
      );
      this.dolomitForm.setControl(
        `prinyato${i + 1}`,
        this._fb.control(carriage.prinyato || '', [
          Validators.required,
          Validators.max(1000),
        ])
      );
      this.dolomitForm.setControl(
        `pogruzheno${i + 1}`,
        this._fb.control(carriage.pogruzheno || '', [
          Validators.required,
          Validators.max(1000),
        ])
      );
      this.dolomitForm.setControl(
        `type${i + 1}`,
        this._fb.control(carriage.carriageType?.type || '', [
          Validators.required,
          Validators.max(1000),
        ])
      );
    }

    this.isEditMode = !!data?.carriages;
  }

  updateSubmit() {
    if (this.dolomitForm.valid) {
      const formData = this.dolomitForm.value;
      const updatedData: DataDolomit[] = [];

      for (let i = 0; i < this.originalDolomit.carriages.length; i++) {
        const originalCarriage = this.originalDolomit.carriages[i];

        updatedData.push({
          id: originalCarriage.id,
          dateCreated: originalCarriage.dateCreated,
          plusMinusPrinyato: originalCarriage.plusMinusPrinyato,
          zayavleno:
            formData[`zayavleno${i + 1}`] || originalCarriage.zayavleno,
          prinyato: formData[`prinyato${i + 1}`] || originalCarriage.prinyato,
          pogruzheno:
            formData[`pogruzheno${i + 1}`] || originalCarriage.pogruzheno,
          carriageType: {
            type: originalCarriage.carriageType.type,
            id: originalCarriage.carriageType.id,
            description: originalCarriage.carriageType.description,
          },
        });
      }

      this._dolomitService.updateDataDolomit(updatedData).subscribe({
        next: (val: DataDolomit[]) => {
          location.reload();
          alert('Update Success');
          this._dialogRef.close('Update Success');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  createSubmit() {
    if (this.dolomitForm.valid) {
      const formData = this.dolomitForm.value;
      const updatedData: DataDolomit[] = [];

      for (let i = 0; i < this.data?.carriages?.length; i++) {
        let prinyato = formData[`prinyato${i + 1}`];
        let pogruzheno = formData[`pogruzheno${i + 1}`];
        let zayavleno = formData[`zayavleno${i + 1}`];

        updatedData.push({
          id: Math.random().toString(),
          dateCreated: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, '-'),
          plusMinusPrinyato: prinyato - pogruzheno,
          zayavleno: zayavleno,
          prinyato: prinyato,
          pogruzheno: pogruzheno,
          carriageType: {
            type: this.carriageTypeOrder[i],
            id: i + 1,
            description: getDescriptionByIndex(i + 1),
          },
        });

        function getDescriptionByIndex(index: number): string {
          if (index === 1) {
            return "Цестерны цементовозы";
          } else if (index === 2) {
            return "Хапры";
          } else if (index === 3) {
            return "Полувагоны";
          } else {
            return "";
          }
        }
      }

      this._dolomitService.createdDataDolomit(updatedData).subscribe({
        next: (val: DataDolomit[]) => {
          location.reload();
          alert('Update Success');
          this._dialogRef.close('Update Success');
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  title = 'angular-key-press-example';
  keyPressNumbers(event: {
    which: any;
    keyCode: any;
    preventDefault: () => void;
  }) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
