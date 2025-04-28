import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mobile_View from './pages/Mobile_View';
import CreateMobile from './pages/CreateMobile';
import Registration from './pages/Authication/Registration';
import Login from './pages/Authication/Login';
import Navbar from './Component/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/User/Profile';
import ChatRoom from './pages/Chat';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Mobile_View />} />
            <Route path="/create" element={<CreateMobile />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
