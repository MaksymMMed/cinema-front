import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import styles from './SignUpPage.module.css'
import Cookies from 'js-cookie'
import { useState } from 'react';
import { TokenDto } from '../../../DTOs/Account/TokenDto';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpDtoHelper } from '../../../DTOs/Account/SignUpDto';
import { signUp } from '../../../Api/AccountApi';

const SignUpPage = () => {
    const [signUpDto, setSignUpDto] = useState<SignUpDtoHelper>({ email: '', password: '',repeatPassword:'',
        firstName:'',lastName:''});
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpDto((prev) => ({ ...prev, [name]: value })); 
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const tokenData: TokenDto = await signUp(signUpDto.email, signUpDto.password,signUpDto.repeatPassword,signUpDto.firstName,signUpDto.lastName);
            console.log("Login successful: ", tokenData);
            Cookies.set('token',tokenData.token,{expires: new Date(tokenData.expiration)})
            navigate('/')

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className={styles['page']}>
            <p className={styles['title']}>VistaCinema</p>
            <div className={styles['main-form']}>
                <h2 style={{color:"#864000"}}>Create new account</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'85%',margin:'auto'}}>
                        <Input name='firstName' placeholder='First Name'required={true}
                        value={signUpDto.firstName} size='m' onChange={handleChange}/>

                        <Input name='lastName' placeholder='Last Name'required={true}
                        value={signUpDto.lastName} size='m' onChange={handleChange}/>
                    </div>
                    <Input name='email' placeholder='Email'required={true}
                    value={signUpDto.email} size='xl' style={{marginTop:'15px'}} onChange={handleChange}/>

                    <Input name='password' type='password' placeholder='Password'
                    required={true} size='xl' style={{marginTop:'15px'}} value={signUpDto.password} onChange={handleChange}/>

                    <Input name='repeatPassword' type='password' placeholder='Repeat password'
                    required={true} size='xl' style={{marginTop:'15px'}} value={signUpDto.repeatPassword} onChange={handleChange}/>

                    <Button size='xl' style={{marginTop:'15px'}} type='submit'>Sign Up</Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Link style={{display:'inline-block',marginTop:'15px', textDecoration:'none', color: "#864000"}} to={'/signIn'}>Already have an account?</Link>
                </form>
            </div>
        </div>
    )
};

export default SignUpPage;
