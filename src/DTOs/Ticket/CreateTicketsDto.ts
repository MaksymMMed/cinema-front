import { HallSeatDto } from "../Hall/HallSeatDto"

export interface CreateTicketsDto{
    sessionId:string
    hallSeats:HallSeatDto[]
}