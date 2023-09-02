import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import Main from './Routes/Main';
import Signup from './Routes/signup';

// import UserProvider from './UserProvider.js'; Maybe useful for having global state if we need it
import './Styles/styles.css'

const root = createRoot(document.getElementById('root'));

root.render(
//   <UserProvider>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>,
//   </UserProvider>,
  document.getElementById('root'),
);
