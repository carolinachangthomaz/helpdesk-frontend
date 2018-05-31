import { FiltroService } from './../../services/filtro.service';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {
    
    filtro: FiltroService;

    constructor(){
        this.filtro = FiltroService.getInstance();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let autRequest: any;

      if(this.filtro.isLoggedIn()){
        autRequest = req.clone({
            setHeaders: {
                'Authorization' : this.filtro.token
            }
        });
        return next.handle(autRequest);
      }else{
        return next.handle(req);
      }
    }
}