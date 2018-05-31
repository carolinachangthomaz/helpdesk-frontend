import { LoginGuard } from './components/security/login.guard';
import { CanActivate } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {Routes, RouterModule} from '@angular/router'
import { componentFactoryName } from '@angular/compiler';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes =[
     {path: '',component: HomeComponent,canActivate: [LoginGuard]},
     {path: 'login', component: LoginComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);