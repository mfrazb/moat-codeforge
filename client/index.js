import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';

// import UserProvider from './UserProvider.js'; Maybe useful for having global state if we need it

render(
//   <UserProvider>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>,
//   </UserProvider>,
  document.getElementById('root'),
);
