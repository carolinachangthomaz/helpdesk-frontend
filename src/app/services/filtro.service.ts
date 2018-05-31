import { User } from './../model/user.model';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FiltroService {

  public static instance : FiltroService = null;
  user: User;
  token: string;
  showTemplate = new EventEmitter<boolean>();
  constructor() {
    return FiltroService.instance = FiltroService.instance || this;
   }

   public static getInstance(){
     if(this.instance == null){
       this.instance = new FiltroService();
     }
     return this.instance;
   }

   isLoggedIn():boolean{
    if(this.user == null){
      return false;
    }
    return this.user.email != '';
   }
}
