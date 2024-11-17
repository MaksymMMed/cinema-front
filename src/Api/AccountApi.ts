import axios from 'axios';
import { TokenDto } from '../DTOs/Account/TokenDto';
import { SignInDto } from '../DTOs/Account/SignInDto';
import { SignUpDto } from '../DTOs/Account/SignUpDto';

const API_BASE_URL = 'https://localhost:7050/api/Account/';

export const signIn = async (email: string, password: string): Promise<TokenDto> => {
    const signInData: SignInDto = { email, password };

    try {
        const response = await axios.post<TokenDto>(`${API_BASE_URL}sign-in`, signInData);
        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to sign in');
    }
};

export const signUp = async (email: string, password: string,repeatPassword:string,firstName:string,lastName:string): Promise<TokenDto> => {
    let username:string = firstName + lastName;
    const signUpData: SignUpDto = { email, password, username  };
    if (repeatPassword === password){

        try {
            const response = await axios.post<TokenDto>(`${API_BASE_URL}sign-up-user`, signUpData);
            return response.data; 
        } catch (error: any) {
            throw new Error(error.response?.data || 'Failed to sign up');
        }
    }
    else{
        throw new Error('Passwords do not match');
    }
};