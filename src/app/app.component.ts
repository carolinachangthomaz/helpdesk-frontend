import { FiltroService } from './services/filtro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showTemplate: boolean =false;
  public filtro: FiltroService;

  constructor() { 
    this.filtro = FiltroService.getInstance();
  }

  ngOnInit() {
    this.filtro.showTemplate.subscribe(
      show => this.showTemplate = show
    )
  }
  
  showContentWrapper() {
    return {
       'content-wrapper' : this.filtro.isLoggedIn()
    }
  }
}
