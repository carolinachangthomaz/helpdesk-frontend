import { Router } from '@angular/router';
import { TicketService } from './../../services/ticket.service';
import { DialogService } from './../../dialog.service';
import { Component, OnInit } from '@angular/core';
import { FiltroService } from '../../services/filtro.service';
import { Ticket } from '../../model/ticket.model';
import { ResponseApi } from '../../model/response-api';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  designado: boolean = false;
  page: number=0;
  count: number=5;
  pages: Array<number>;
  filtro: FiltroService;
  message: {};
  classCss: {};
  listTicket=[];
  ticketFilter = new Ticket('',null,'','','','','',null,null,'',null);

  constructor(
    private dialogService: DialogService,
    private ticketService: TicketService,
    private router: Router
  ) {
    this.filtro = FiltroService.getInstance();
   }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page: number, count: number){
    this.ticketService.findAll(page,count).subscribe((responseApi: ResponseApi) => {
       this.listTicket = responseApi['data']['content'];
       this.pages =  new Array(responseApi['data']['totalPages'])
   } , err => {
     this.showMessage({
       type: 'error',
       text: err['error']['errors'][0]
     });
   });
 }

 filter(): void{
   this.page = 0;
   this.count = 5;
   this.ticketService.findByParans(this.page,this.count,this.designado,this.ticketFilter)
   .subscribe((responseApi: ResponseApi) =>{
        this.ticketFilter.titulo = this.ticketFilter.titulo == 'uninformed' ? '' : this.ticketFilter.titulo ;
        this.ticketFilter.numero = this.ticketFilter.numero == 0 ? null : this.ticketFilter.numero ;
        this.listTicket = responseApi['data']['content'];
        this.pages =  new Array(responseApi['data']['totalPages']);
   },
  error =>{
    this.showMessage({
      type: 'error',
      text: error['error']['errors'][0]
    });
  })
 }

 limparFiltro(){
   this.designado = false;
   this.page = 0;
   this.count = 5;
   this.ticketFilter = new Ticket('',null,'','','','','',null,null,'',null);
   this.findAll(this.page, this.count);
 }

 edit(id: string){
   this.router.navigate(['/ticket-new',id]);
 }

 detalhes(id: string){
  this.router.navigate(['/ticket-detalhe',id]);
}

delete(id: string){
  this.dialogService.confirm('Confirmar Exclusã?')
  .then((candelete:boolean) => {
    if(candelete){
      this.message = {};
      this.ticketService.delete(id).subscribe((responseApi: ResponseApi) => {
        this.showMessage({
           type: 'success',
           text: 'Ticket excluído'
        });
        this.findAll(this.page,this.count);
      }, err =>{
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      })
    }
  })
}

setNextPage(event:any){
  event.preventDefault();
  if(this.page+1 < this.pages.length){
    this.page = this.page + 1;
    this.findAll(this.page,this.count);
  }
}

setPreviousPage(event:any){
  event.preventDefault();
  if(this.page > 0){
    this.page = this.page - 1;
    this.findAll(this.page,this.count);
  }
}

setPage(i,event:any){
  event.preventDefault();
    this.page = i;
    this.findAll(this.page,this.count);
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

}
