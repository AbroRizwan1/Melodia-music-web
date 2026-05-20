import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Register from './pages/Register';
import Login from './pages/login';
import Layout from './layout/layout';
import CreateMusic from './pages/CreateMusic';
import Dasbhoard from './Dashboard/Dasbhoard';
import Popup from './Component/popup';
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
