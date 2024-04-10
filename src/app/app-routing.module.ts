import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsComponent } from './form/forms/forms.component';
import { HttpComponent } from './http/http.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirect to /dashboard by default
  { path: 'dashboard', component: DashboardComponent }, // Route for the dashboard component
  { path: 'form', component: FormsComponent }, // Route for the dashboard component
  { path: 'http', component: HttpComponent }, // Route for the dashboard component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
