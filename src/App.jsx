import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWebsite from './components/MainWebsite';
import AdminLogin from './components/AdminLogin';
import AdminEnquiries from './components/AdminEnquiries';
import UnderMaintenance from './components/UnderMaintenance'; // ✅ ADD THIS

function App() {
  return (
    <Router>
      <Routes>

        {/* 🔴 COMMENT ALL EXISTING ROUTES */}
        {/*
        <Route path="/" element={<MainWebsite />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route 
          path="/admin/dashboard" 
          element={<AdminEnquiries/>} 
        />
        */}

        {/* ✅ ONLY MAINTENANCE PAGE */}
        <Route path="/" element={<UnderMaintenance />} />

        {/* ✅ HANDLE ALL OTHER ROUTES */}
        <Route path="*" element={<UnderMaintenance />} />

      </Routes>
    </Router>
  );
}

export default App;