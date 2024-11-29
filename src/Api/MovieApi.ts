import axios from 'axios';
import { MovieDetailsDto } from '../DTOs/Movie/MovieDetailsDto';
import { MovieFilteringModel } from '../DTOs/Movie/MovieFilteringModel';
import { MovieReadDto } from '../DTOs/Movie/MovieReadDto';
import { PaginatedPage } from '../DTOs/PaginatedPage';


const API_BASE_URL = 'https://localhost:7050/api/Movies/';

export const getMovieDetails = async (id: string): Promise<MovieDetailsDto> => {

    try {
        const response = await axios.get<MovieDetailsDto>(`${API_BASE_URL}${id}` );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get data');
    }
};

export const getMovies = async (model:MovieFilteringModel): Promise<PaginatedPage<MovieReadDto>> =>{
    try {
        const response = await axios.get<PaginatedPage<MovieReadDto>>(`${API_BASE_URL}`, {params:model} );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get data');
    }
}