import './App.css';
import SignInPage from './Pages/SignInPage/SignInPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
            <Routes>
                <Route path="/signIn" element={<SignInPage/>} />
                <Route path="/signUp" element={<SignUpPage/>} />
            </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
