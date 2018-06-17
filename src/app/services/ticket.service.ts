import { Ticket } from './../model/ticket.model';
import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  createOrUpdate(ticket: Ticket){
    if(ticket.id != null && ticket.id != ''){
      return this.http.put(`${HELP_DESK_API}/tickets`, ticket);
    }else{
      ticket.id = null;
      ticket.status = 'Novo';
      return this.http.post(`${HELP_DESK_API}/tickets`, ticket);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HELP_DESK_API}/tickets/${page}/${count}`);
  }

  findById(id: string){
    return this.http.get(`${HELP_DESK_API}/tickets/${id}`);
  }

  delete(id: string){
    return this.http.delete(`${HELP_DESK_API}/tickets/${id}`);
  }

  findByParans(page: number, count: number,designados:boolean,ticket: Ticket){
    ticket.numero = ticket.numero == 0 ? null : ticket.numero;
    ticket.titulo = ticket.titulo == 'uninformed' ? '' : ticket.titulo;
    return this.http.get(`${HELP_DESK_API}/tickets/${page}/${count}/${ticket.numero}/${ticket.titulo}/${ticket.status}/${ticket.prioridade}/${designados}`);
  }

  alterarStatus(status: string, ticket: Ticket){
    return this.http.put(`${HELP_DESK_API}/tickets/${ticket.id}/${status}`, ticket);
  }

  sumario(){
    return this.http.get(`${HELP_DESK_API}/tickets/sumarios`);
  }
}
