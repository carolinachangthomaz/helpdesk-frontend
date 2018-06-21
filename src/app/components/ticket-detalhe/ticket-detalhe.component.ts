import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/filtro.service';
import { Ticket } from '../../model/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-ticket-detalhe',
  templateUrl: './ticket-detalhe.component.html',
  styleUrls: ['./ticket-detalhe.component.css']
})
export class TicketDetalheComponent implements OnInit {

  ticket = new Ticket('',0,'','','','','',null,null,'',null);
  filtro: FiltroService;
  message: {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {
    this.filtro = FiltroService.getInstance(); 
  }

  ngOnInit() {
    let id:string = this.route.snapshot.params['id'];
    if(id != undefined){
      this.findById(id);
    }
  }

  findById(id: string){
    this.ticketService.findById(id).subscribe((responseApi: ResponseApi) => {
      this.ticket = responseApi.data;
      this.ticket.date = new Date(this.ticket.date).toISOString();
      console.log(this.ticket.date);
    },err =>{
       this.showMessage({
         type: 'error',
         text: err['error']['errors'][0]
       });
    });
  }

  alterarStatus(status:string) : void{
    this.ticketService.alterarStatus(status,this.ticket)
           .subscribe((responseApi: ResponseApi) => {
            this.ticket = responseApi.data;
            this.ticket.date = new Date(this.ticket.date).toISOString();
           },err =>{
            this.showMessage({
              type: 'error',
              text: err['error']['errors'][0]
            });
         });
  }

  private showMessage(message: {type: string, text: string}) : void{
    this.message = message;
    this.buildClass(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  private buildClass(type: string) : void{
    this.classCss = {
          'alert' : true
    }
    this.classCss['alert-'+type] = true;
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {}{
    return {
        'form-group' : true,
        'has-error' : isInvalid && isDirty,
        'has-success' : !isInvalid && isDirty
    };
  }

}
