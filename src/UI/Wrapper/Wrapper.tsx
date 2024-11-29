import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface WrapperProps{
  children?: React.ReactNode;

}


const Wrapper: React.FC<WrapperProps> = ({ children }) => {

    const navigate = useNavigate()

    const checkCookie = () => {

        const token = Cookies.get('token')

        if(token != null){
        }
        else{
            navigate('/SignIn')
        }
    }

    useEffect(() => {
        checkCookie();
      }, []);


    return(
        <div style={{display:'block'}}>
            <div style={{width:'100%',background:'#FF7A00',display:"flex",justifyContent:'space-between'}}>
                <Link style={{margin:'1em 0 1em 1em',textDecoration:'none', fontSize:'1.2em',color:'white'}} to={'/'}>VistaCinema</Link>
                <Link style={{margin:'1em 1em 1em 0',textDecoration:'none', fontSize:'1.2em',color:'white'}} to={'/profile'}>MyAccount</Link>
            </div>
            {children}
        </div>
    )

}

export default Wrapper