import { User } from "./user.model";

export class Ticket{
    constructor(
       public id: string,
       public numero: number,
       public titulo: string,
       public status: string,
       public prioridade: string,
       public descricao: string,
       public image: string,
       public user: User,
       public usuarioDesignado: User,
       public data: string,
       public listStatusAlteracao: Array<string>
    ){}
}