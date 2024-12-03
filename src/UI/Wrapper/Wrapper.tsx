import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Button/Button';
import Cookies from 'js-cookie';

const Wrapper = () => {
	const navigate = useNavigate();
	const token = Cookies.get('token');
	const [showSearch, setShowSearch] = useState(false); // Стан для пошукового рядка
	const [movieName, setMovieName] = useState<string>('');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<div
				style={{
					width: '100%',
					background: '#FF7A00',
				}}>
				<div
					className="container"
					style={{
						margin: 'auto',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						padding: '1em',
					}}>
					<Link
						style={{ textDecoration: 'none', fontSize: '1.5em', fontWeight: 600, color: 'white' }}
						to="/">
						VistaCinema
					</Link>
					<img
						style={{ width: '32px', height: '32px', cursor: 'pointer' }}
						src="./searchIcon.png"
						alt="Search"
						onClick={() => setShowSearch(!showSearch)}
					/>
					{token ? (
						<Link
							style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
							to="/profile">
							Профіль
						</Link>
					) : (
						<Link
							style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
							to="/signin">
							Увійти|Зареєструватись
						</Link>
					)}
				</div>
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
						size="s"
						onClick={() => navigate(`/films?name=${movieName}`)}
						style={{ marginLeft: '10px' }}>
						Find
					</Button>
				</div>
			)}

			<Outlet />

			<div
				style={{
					width: '100%',
					background: '#FF7A00',
					padding: '1em',
					color: 'white',
					textAlign: 'center',
					fontWeight: 600,
					marginTop: 'auto',
				}}>
				Untitled Developers Team © 2024 VistaCinema
			</div>
		</div>
	);
};

export default Wrapper;
