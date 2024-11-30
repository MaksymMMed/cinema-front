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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route path="/signIn" element={<SignInPage/>} />
                <Route path="/signUp" element={<SignUpPage/>} />
                <Route path="/" element={<Wrapper><MainPage/></Wrapper> } />
                <Route path="/profile" element={<Wrapper><ProfilePage/></Wrapper> } />
                <Route path="/film/:id" element={<Wrapper><MoviePage/></Wrapper> } />
                <Route path="/films" element={<Wrapper><SearchMoviePage/></Wrapper> } />
                <Route path="/booking" element={<Wrapper><BookingPage/></Wrapper> } />

                <Route path="/*" element={<NotFoundPage/>} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
