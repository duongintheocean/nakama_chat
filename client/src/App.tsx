import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import Authentication from './components/Authentication';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/authen'element={<Authentication></Authentication>}>
        <Route path=''element={<Login></Login>}></Route>
        <Route path='register'element={<Register></Register>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
