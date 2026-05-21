import React from 'react'
import { Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './layout/Layout';
import Dasbhoard from './Dashboard/Dasbhoard';
import ProtectedRoute from './Component/ProtectedRoute';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={
          <ProtectedRoute artistOnly={true}>
            <Dasbhoard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}
export default App