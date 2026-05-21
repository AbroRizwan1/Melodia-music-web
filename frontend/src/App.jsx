import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Register from './pages/Register';
import Login from './pages/Login';
import Layout from './layout/Layout';
import CreateMusic from './pages/CreateMusic';
import Dasbhoard from './Dashboard/Dasbhoard';
import Popup from '../src/Component/Popup'
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
          <ProtectedRoute artistOnly={true} >
            <Dasbhoard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Login />} />
      </Routes>

    </div>

  )
}

export default App
