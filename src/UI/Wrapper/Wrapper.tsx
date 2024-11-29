import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';

interface WrapperProps {
  children?: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false); // Стан для пошукового рядка
  const [movieName, setMovieName] = useState<string>("");

  const checkCookie = () => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/SignIn');
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div style={{ display: 'block' }}>
      <div
        style={{
          width: '100%',
          background: '#FF7A00',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1em',
        }}
      >
        <Link
          style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
          to="/"
        >
          VistaCinema
        </Link>
        <img
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
          src="./searchIcon.png"
          alt="Search"
          onClick={() => setShowSearch(!showSearch)}
        />
        <Link
          style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
          to="/profile"
        >
          MyAccount
        </Link>
      </div>

      {/* Поле пошуку */}
      {showSearch && (
        <div style={{ width: '50%', padding: '1em', display: 'flex', margin: 'auto' }}>
          <input
            onChange={(e) => setMovieName(e.target.value)} // Виправлено
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '0.5em',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
          <Button
            size='s'
            onClick={() => navigate(`/films?name=${movieName}`)}
            style={{ marginLeft: '10px' }}
          >
            Find
          </Button>
        </div>
      )}

      {children}
    </div>
  );
};

export default Wrapper;
