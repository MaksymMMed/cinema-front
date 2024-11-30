import { HallRowDataDto } from "./HallRowDataDto"

export interface HallDetailReadDto{
    id:string
    name:string
    capacity:number
    rowsData:HallRowDataDto[]
}   