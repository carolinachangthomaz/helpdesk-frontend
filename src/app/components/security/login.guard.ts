import { Observable } from 'rxjs';
import { FiltroService } from './../../services/filtro.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
    
    public filtro: FiltroService;

    constructor(private router: Router){
        this.filtro = FiltroService.getInstance();
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot):  Observable<boolean> | boolean {
        if(this.filtro.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/login'])
        return false;
    }
}