import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './pages/list/list.component';
import { AaaComponent } from './pages/aaa/aaa.component';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'aaa',
        component: AaaComponent
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
