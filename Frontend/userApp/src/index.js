import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import reportWebVitals from './reportWebVitals';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();