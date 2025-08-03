import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home.jsx';
import Login from './pages/loginform.jsx';
import About from './pages/about.jsx';
import ForgetPass1 from './pages/enterEmail.jsx';
import ResetPassword from './pages/typePass.jsx';
import Register from './pages/register.jsx';
import { Dashboard } from './pages/dashboard.jsx';
import Unauth from './pages/unauth.jsx';
import NotFound from './pages/notfound.jsx';
import Profile from './pages/profile.jsx';
import { UserContextProvider } from './context/UserContext.jsx';

function ProtectedLayout() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<Profile />} />
      </Routes>
    </UserContextProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/forgotpassword" element={<ForgetPass1 />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauth />} />

        {/* Protected layout route */}
        <Route path="/*" element={<ProtectedLayout />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
