import { MoviePreviewDto } from "../Movie/MoviePreviewDto";

export interface SessionDetailsDto{
    id: string; 
    hallId: string; 
    hallName:string;
    startDateUtc: Date;
    endDateUtc: Date;
    basePrice: number;
    ticketsCount: number;
    hallCapacity: number; 
    seats: boolean[][];
    movie:MoviePreviewDto
}

