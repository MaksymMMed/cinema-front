import axios from "axios";
import { SessionDetailsDto } from "../DTOs/Session/SessionDetailsDto";

const API_BASE_URL = 'https://localhost:7050/api/Sessions/';

export const getSessionDetails = async (id: string): Promise<SessionDetailsDto> => {

    try {
        const response = await axios.get<SessionDetailsDto>(`${API_BASE_URL}${id}` );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get data');
    }
};