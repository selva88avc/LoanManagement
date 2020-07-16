import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './helper/auth.guard';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';


const routes: Routes = [
  { path: 'list', component: LoanListComponent, canActivate: [AuthGuard] },
  { path: 'loan', component: LoanDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'loan', component: LoanDetailComponent },
  { path: 'list', component: LoanListComponent },
  { path: '**', redirectTo: 'list' }
];

//export const appRoutingModule = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }