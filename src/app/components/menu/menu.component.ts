import { FiltroService } from './../../services/filtro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  filtro: FiltroService;

  constructor() {
    this.filtro = FiltroService.getInstance();
   }

  ngOnInit() {
  }

}
