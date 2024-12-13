import axios from 'axios';
import { ReviewCreateDto } from '../DTOs/Review/ReviewCreateDto';
import { ReviewReadDto } from '../DTOs/Review/ReviewReadDto';
import Cookies from 'js-cookie';
import { ReviewFilteringModel } from '../DTOs/Review/ReviewFilteringModel';
import { PaginatedList } from '../DTOs/PaginatedList';

const API_BASE_URL = 'https://localhost:7050/api/Reviews/';

export const createReview = async (review:ReviewCreateDto): Promise<ReviewReadDto> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post<ReviewReadDto>(
            `${API_BASE_URL}`,
            review,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to sign in');
    }
};


export const getReviews = async (model:ReviewFilteringModel): Promise<PaginatedList<ReviewReadDto>> => {
    try {
        const response = await axios.get<PaginatedList<ReviewReadDto>>(`${API_BASE_URL}`, {params:model} );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get data');
    }
};