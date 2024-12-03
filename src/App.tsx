import './App.css';
import MainPage from './Pages/MainPage/MainPage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Wrapper from './UI/Wrapper/Wrapper';
import MoviePage from './Pages/MoviePage/MoviePage';
import SignInPage from './Pages/Account/SignInPage/SignInPage';
import SignUpPage from './Pages/Account/SignUpPage/SignUpPage';
import SearchMoviePage from './Pages/SearchMoviePage/SearchMoviePage';
import ProfilePage from './Pages/Account/ProfilePage/ProfilePage';
import BookingPage from './Pages/BookingPage/BookingPage';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/signIn" element={<SignInPage />} />
					<Route path="/signUp" element={<SignUpPage />} />
					<Route element={<Wrapper />}>
						<Route path="/" element={<MainPage />} />
						<Route path="/film/:id" element={<MoviePage />} />
						<Route path="/films" element={<SearchMoviePage />} />
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route element={<Wrapper />}>
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/booking" element={<BookingPage />} />
						</Route>
					</Route>

					<Route path="/*" element={<NotFoundPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
