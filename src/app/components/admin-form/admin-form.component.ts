import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperatorsService } from '../../services/operators.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  adminForm: FormGroup;
  showAlert: boolean = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService, private operatorsService: OperatorsService) {
    this.adminForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      const formData = { ...this.adminForm.value };
      const jsonData = JSON.stringify(formData);
  
      this.http.post('URL_БЭКЭНДА', jsonData, { responseType: 'text' }).subscribe(
        response => {
          console.log(response);
          this.adminForm.reset();
          this.toastr.success('Оператор успешно добавлен');
          this.router.navigate(['/operators']);
        },
        error => {
          console.error(error);
          this.toastr.error('Ошибка при добавлении оператора');
        }
      );
    } else {
      this.toastr.error('Пожалуйста, заполните все обязательные поля');
    }
  }

  onCancel() {
    console.log("Отменено");
    this.adminForm.reset();
    this.router.navigateByUrl('/operators');
  }

  
  ngOnInit() {
    const selectedOperator = this.operatorsService.getSelectedOperator();
    if (selectedOperator) {
      this.adminForm.patchValue(selectedOperator);
    }
  }
}