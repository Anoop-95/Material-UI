import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast';
import News from './components/News'
import { Box } from '@mui/material'
import Login from './components/Login'
import Signup from './components/Signup'
import Saved from './components/Saved'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fontsource/bebas-neue';



function App() {
  const [category, setCategory] = useState("general");
  


  return (
    <>
     <Toaster position="top-center" reverseOrder={false} />
     <Router>
      <Box sx={{ width: '100vw', overflowX: 'hidden' }}>
         <Navbar selectedCategory={category} onCategoryChange={setCategory}/>
      
        
        <Routes>
          <Route path="/" element={<News category={category} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/saved" element={<Saved />} />
      </Routes>
      </Box>
     


     </Router>
        
        
      
      
      
    </>
  )
}

export default App
