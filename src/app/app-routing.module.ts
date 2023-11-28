import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DataListComponent } from './components/data-list/data-list.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { OperatorsListComponent } from './components/operators-list/operators-list.component';

const routes: Routes = [
  { path: 'list', component: DataListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', component: DataListComponent },
  { path: 'admin', component: AdminFormComponent },
  { path: 'operators', component: OperatorsListComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
