import { InvoiceDetailsReadDto } from "../Invoice/InvoiceDetailsReadDto"
import { ReviewReadDto } from "../Review/ReviewReadDto"
import { TicketReadDto } from "../Ticket/TicketReadDto"

export interface UserInfoDto{
    userName:string
    email:string
    invoices:InvoiceDetailsReadDto[]
    reviews:ReviewReadDto[]
}