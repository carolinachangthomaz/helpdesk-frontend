import { CurrentUser } from './../../../model/currentUser.model';
import { UserService} from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FiltroService } from './../../../services/filtro.service';
import { User } from '../../../model/user.model';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('','','','');
  filtro: FiltroService;
  message: string;

  constructor(
    private UserService: UserService,
    private router: Router

  ) { 
    this.filtro = FiltroService.getInstance();
  }

  ngOnInit() {
  }

  login(){
    this.message = '';
    this.UserService.login(this.user).subscribe((userAuthentication: CurrentUser)=> {
      this.filtro.token = userAuthentication.token;
      this.filtro.user = userAuthentication.user;
      this.filtro.user.proFile = this.filtro.user.proFile.substring(5);
      this.filtro.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.filtro.token = null;
      this.filtro.user = null;
      this.filtro.showTemplate.emit(false);
      this.message = "Erro";
    });
  }

  cancelLogin(){
    this.message = '';
    this.user = new User('','','','');
    window.location.href = '/login';
    window.location.reload;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {}{
    return {
        'form-group' : true,
        'has-error' : isInvalid && isDirty,
        'has-success' : !isInvalid && isDirty
    };
  }
}
