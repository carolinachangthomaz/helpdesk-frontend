import { UserListComponent } from './components/user-list/user-list.component';
import { LoginGuard } from './components/security/login.guard';
import { CanActivate } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { HomeComponent } from './components/home/home.component';
import {Routes, RouterModule} from '@angular/router'
import { componentFactoryName } from '@angular/compiler';
import { ModuleWithProviders } from '@angular/core';
import { UserNewComponent } from './components/user-new/user-new.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetalheComponent } from './components/ticket-detalhe/ticket-detalhe.component';

export const ROUTES: Routes =[
     {path: 'login', component: LoginComponent},
     {path: '',component: HomeComponent,canActivate: [LoginGuard]},
     { path: 'user-new' , component: UserNewComponent, canActivate:  [LoginGuard] },
     { path: 'user-new/:id' , component: UserNewComponent, canActivate:  [LoginGuard] },
     { path: 'user-list' , component: UserListComponent, canActivate:  [LoginGuard] },
     { path: 'ticket-new' , component: TicketNewComponent, canActivate:  [LoginGuard] },
     { path: 'ticket-new/:id' , component: TicketNewComponent, canActivate:  [LoginGuard] },
     { path: 'ticket-list' , component: TicketListComponent, canActivate:  [LoginGuard] },
     { path: 'ticket-detalhe/:id' , component: TicketDetalheComponent, canActivate:  [LoginGuard] }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);