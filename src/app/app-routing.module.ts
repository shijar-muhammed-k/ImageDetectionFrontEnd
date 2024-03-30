import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { CheckComponent } from './user/check/check.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ContactUsComponent } from './user/contact-us/contact-us.component';
import { ContactListComponent } from './admin/contact-list/contact-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ReportListComponent } from './admin/report-list/report-list.component';
import { loginGuard } from './core/guard/login.guard'
import { authGuard } from './core/guard/auth.guard'

const routes: Routes = [
  
  
  {
    path: '',
    canActivate: [loginGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { path: 'detect', component: CheckComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'feedback', component: ContactListComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'report-list', component: ReportListComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
