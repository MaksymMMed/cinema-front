import Cookies from 'js-cookie'
import Button from '../../../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserInfoDto } from '../../../DTOs/Account/UserInfoDto';
import { getUserInfo } from '../../../Api/AccountApi';
import './ProfilePage.css'
import TicketsList from '../../../UI/TicketsList/TicketsList';

const ProfilePage = () => {
    
        const [userInfo,setUserInfo] = useState<UserInfoDto | null>(null)
        const navigate = useNavigate()

        const fetchUserData = async () => {

            const token = Cookies.get('token')

            if(token != null){
                const response = await getUserInfo(token)
                console.log(response)
                setUserInfo(response)
            }
            else{
                navigate('/SignIn')
            }
        }

        useEffect(() => {
            fetchUserData();
        }, []);
        

        

        if (!userInfo) {
            return <p>Loading...</p>;
        }

    return (
        <div className='profile'> 
            <div className='user-info'>
                <img style={{padding:'10px', height:'256px',width:'auto',backgroundColor:'#9a9a9a',borderRadius:'50%'}} src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="user logo" />
                <div className='info'>
                    <p>{userInfo.userName}</p>
                    <p>{userInfo.email}</p>
                    <Button style={{backgroundColor:'#9a9a9a',color:'black',border:'none'}} size='xl'>Edit profile</Button>
                </div>
            </div>
            <div className='tickets-info'>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <p style={{fontSize:'22px',fontWeight:'500',margin:'0'}}>Purchase history</p>
                    {/* <Input placeholder='Search'/> */}
                </div>
                <div className='line'></div>
                <TicketsList style={{marginTop:'15px'}} tickets={userInfo.invoices}/>
            </div>
        </div>
    )
};

export default ProfilePage
