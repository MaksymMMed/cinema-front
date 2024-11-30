import axios from "axios";
import { HallDetailReadDto } from "../DTOs/Hall/HallDetailReadDto";

const API_BASE_URL = 'https://localhost:7050/api/Halls/';

export const getHallDetails = async (id:string): Promise<HallDetailReadDto> => {

    try {
        const response = await axios.get<HallDetailReadDto>(`${API_BASE_URL}${id}`, );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to sign in');
    }
};