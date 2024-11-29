import axios from 'axios';
import { TokenDto } from '../DTOs/Account/TokenDto';
import { SignInDto } from '../DTOs/Account/SignInDto';
import { SignUpDto } from '../DTOs/Account/SignUpDto';
import { UserInfoDto } from '../DTOs/Account/UserInfoDto';

const API_BASE_URL = 'https://localhost:7050/api/Account/';

export const signIn = async (signInDto:SignInDto): Promise<TokenDto> => {

    try {
        const response = await axios.post<TokenDto>(`${API_BASE_URL}sign-in`, signInDto);
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

export const getUserInfo = async (token:string): Promise<UserInfoDto> => {
    try {
        const response = await axios.get<UserInfoDto>(`${API_BASE_URL}profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; 
    } catch (error: any) {
        throw new Error(error.response?.data || 'Failed to get information');
    }
};