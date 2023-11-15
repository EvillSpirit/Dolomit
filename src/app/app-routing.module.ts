import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DataListComponent } from './components/data-list/data-list.component';

const routes: Routes = [
  { path: 'list', component: DataListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', component: DataListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
