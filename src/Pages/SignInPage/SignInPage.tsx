// src/pages/SignInPage.tsx
import { SignInDto } from '../../DTOs/Account/SignInDto';
import React, { useState } from 'react';
import { signIn } from '../../api/AccountApi';
import { TokenDto } from '../../DTOs/Account/TokenDto';
import Input from '../../UI/Input/Input';
import styles from './SignInPage.module.css'
import Button from '../../UI/Button/Button';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [signInDto, setSignInDto] = useState<SignInDto>({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignInDto((prev) => ({ ...prev, [name]: value })); 
        
    };

    const goToSignUpPage = async () =>{
        navigate('/signUp')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const tokenData: TokenDto = await signIn(signInDto.email, signInDto.password);
            console.log("Login successful: ", tokenData);
            Cookies.set('token',tokenData.token,{expires: new Date(tokenData.expiration)})
            navigate('')

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className={styles['page']}>
            <p className={styles['title']}>VistaCinema</p>
            <div className={styles['main-form']}>
                <h2 style={{color:"#864000"}}>Autentication</h2>
                <form onSubmit={handleSubmit}>
                    <Input name='email' placeholder='Email'required={true}
                    value={signInDto.email} size='xl' onChange={handleChange}/>
                    
                    <Input name='password' type='password' placeholder='Password'
                    required={true} size='xl' style={{marginTop:'15px'}} value={signInDto.password} onChange={handleChange}/>

                    <Button size='xl' style={{marginTop:'15px'}} type='submit'>Sign In</Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
                <p style={{fontSize:'16px',color:"#864000"}}>Forgot password?</p>
                <Button style={{backgroundColor:'#ffffff',color:'#f57331'}} onClick={goToSignUpPage} size='l'>Create account</Button>
            </div>
        </div>
    )
};

export default SignInPage;
