export interface SignUpDto {
    email: string;
    username:string;
    password: string;
}

export interface SignUpDtoHelper {
    email: string;
    firstName:string;
    lastName:string;
    password: string;
    repeatPassword:string
}