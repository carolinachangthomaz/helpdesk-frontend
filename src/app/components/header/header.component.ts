import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/filtro.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  filtro: FiltroService;
  
  constructor() { 
    this.filtro = FiltroService.getInstance();
    this.filtro.user = new User('','','','');
  }

  ngOnInit() {
  }

  logout(): void{
     this.filtro.token = null;
     this.filtro.user = null;
     window.location.href = '/login';
     window.location.reload();
  }

}
