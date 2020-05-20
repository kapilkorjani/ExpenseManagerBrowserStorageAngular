import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:"", redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"expenses",component:AddExpenseComponent , canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [HomeComponent,AddExpenseComponent,LoginComponent,PageNotFoundComponent];

