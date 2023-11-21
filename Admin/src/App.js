import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import User from './Component/User';

function App() {
  return (
    <>
            <Routes>

                      <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/Users" element={<User/>}></Route>
                  </Routes>

    </>
  );
}

export default App;
