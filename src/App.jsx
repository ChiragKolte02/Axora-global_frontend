import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainWebsite from './components/MainWebsite';
import AdminLogin from './components/AdminLogin';
import AdminEnquiries from './components/AdminEnquiries';


function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={<MainWebsite />} />
        
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Dashboard Route */}
        <Route 
          path="/admin/dashboard" 
          element={
           
              <AdminEnquiries/>
            
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;