import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FiltroService } from './../../services/filtro.service';
import { Component, OnInit } from '@angular/core';
import { ResponseApi } from '../../model/response-api';
import { DialogService } from '../../dialog.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  page: number=0;
  count: number=5;
  pages: Array<number>;
  filtro: FiltroService;
  message: {};
  classCss: {};
  listUser=[];

  constructor(
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) { 
    this.filtro = FiltroService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page,this.count);
  }

  findAll(page: number, count: number){
     this.userService.findAll(page,count).subscribe((responseApi: ResponseApi) => {
        this.listUser = responseApi['data']['content'];
        this.pages =  new Array(responseApi['data']['totalPages'])
    } , err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  edit(id: string){
    this.router.navigate(['/user-new',id]);
  }

  delete(id: string){
    this.dialogService.confirm('Confirmar Exclusão?')
    .then((candelete:boolean) => {
      if(candelete){
        this.message = {};
        this.userService.delete(id).subscribe((responseApi: ResponseApi) => {
          this.showMessage({
             type: 'success',
             text: 'Usuário excluído'
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
