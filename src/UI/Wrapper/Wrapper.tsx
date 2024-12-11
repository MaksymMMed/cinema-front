import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../Button/Button';
import Cookies from 'js-cookie';

const Wrapper = () => {
	const navigate = useNavigate();
	const token = Cookies.get('token');
	const [showSearch, setShowSearch] = useState(false);
	const [movieName, setMovieName] = useState<string>('');

	const handleSearch = () => {
		setShowSearch(false);
		navigate(`/films?name=${movieName}`);
	};

	return (
		<div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<div
				style={{
					width: '100%',
					background: '#FF7A00',
					position: 'sticky',
					top: 0,
					zIndex: 1000,
				}}>
				<div
					className="container"
					style={{
						margin: 'auto',
						padding: '1em',
					}}>
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<Link
							style={{ textDecoration: 'none', fontSize: '1.5em', fontWeight: 600, color: 'white' }}
							to="/">
							VistaCinema
						</Link>
						<div style={{ display: 'flex' }}>
							<img
								style={{ width: '24px', height: '24px', cursor: 'pointer', marginRight: '25px' }}
								src="/searchIcon.svg"
								alt="Search"
								onClick={() => setShowSearch(!showSearch)}
							/>
							{token ? (
								<Link
									style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
									to="/profile">
									Profile
								</Link>
							) : (
								<div>
									<Link
										style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
										to="/signIn">
										Sign In
									</Link>
									<Link 
										style={{ textDecoration: 'none', fontSize: '1.2em', color: 'white' }}
										to="/signUp">
										|Sign Up
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{showSearch && (
				<div style={{ width: '50%', padding: '1em', display: 'flex', margin: 'auto' }}>
					<input
						onChange={(e) => setMovieName(e.target.value)}
						type="text"
						placeholder="Search..."
						style={{
							width: '100%',
							padding: '0.5em',
							border: '1px solid #ccc',
							borderRadius: '5px',
						}}
					/>
					<Button size="s" onClick={() => handleSearch()} style={{ marginLeft: '10px' }}>
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
