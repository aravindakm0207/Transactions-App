
import React, { useEffect } from "react";
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute"; 
import Account from "./components/Account";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      
      dispatch({ type: "LOGIN", payload: { account: "User Account", profile: "User Profile" } });
    }
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer position="top-center" />

      <nav>
        {!user?.isLoggedIn ? (
          <>
            <Link to="/register">Register</Link> |
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link> |
            <Link to="/account">Account</Link> |
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </nav>

      <Routes>
        
        <Route path="/" element={!user.isLoggedIn ? <Navigate to="/login" /> : <Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={user.isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/account" element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
