import axios from "axios";
import { CreateTicketsDto } from "../DTOs/Ticket/CreateTicketsDto";
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://localhost:7050/api/Purchase/';

export const purchaseTickets = async (tickets: CreateTicketsDto): Promise<string> => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post<string>(
            `${API_BASE_URL}tickets`,
            tickets,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get data');
    }
};
