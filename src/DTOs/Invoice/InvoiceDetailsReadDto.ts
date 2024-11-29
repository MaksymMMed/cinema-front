import { TicketReadDto } from "../Ticket/TicketReadDto";

export interface InvoiceDetailsReadDto{
    id:string;
    createdBy:string;
    amount:number;
    isPaid:boolean;
    createdOnUtc:Date;
    createdByName:string;
    tickets:TicketReadDto[]
}


