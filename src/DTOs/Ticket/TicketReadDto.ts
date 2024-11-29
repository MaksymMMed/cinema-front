import { TicketMovieDto } from "./TicketMovieDto"

export interface TicketReadDto{
    id:string
    sessionId:string
    sessionDateUtc:Date
    movie:TicketMovieDto
    hallId:string
    hallName:string
    purchasedById:string
    purchasedByName:string
    rowIndex:number
    seatIndex:number
    invoiceId:string

}