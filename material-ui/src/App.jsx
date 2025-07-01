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
import { driver } from "driver.js";
import "driver.js/dist/driver.css";


function App() {
  const [category, setCategory] = useState("general");
  
 useEffect(() => {
    const StoredUser = localStorage.getItem("user");
    const storedTour  = localStorage.getItem("Tourcomp");
    const parsedTour = storedTour ? JSON.parse(storedTour) : null;
    const isExpired = !parsedTour || Date.now() > parsedTour.expiresAt;

    if (StoredUser && isExpired) {
      const drive = driver({
        animate: true,
        showProgress: true,
        allowClose: false,
        popoverClass: 'driverjs-theme',
        steps: [
          {
            element: "#select-bar",
            popover: {
              title: 'Select the category',
              description: 'Select your desired category news ',
              position: 'top'
            }
          },
          {
            element: '#link-btn',
            popover: {
              title: 'Share Your News',
              description: 'copy the link and share with others',
              position: 'top'
            }
          },
          {
            element: '#save-btn',
            popover: {
              title: 'Bookmark it',
              description: 'Save your articles to read later.',
              position: 'top'
            }
          },
          {
            element: '#saved-page',
            popover: {
              title: 'Read later',
              description: 'Your Bookmarked news will be saved here.',
              position: 'left'
            }
          },
          {
            element: '#user-avatar',
            popover: {
              title: 'Logout',
              description: 'Click on the Avatar icon and select the Logout option to end the session.',
              position: 'top'
            }
          },
          {
            popover: {
              title: 'Enjoy Reading 😊',
              position: 'center'
            }
          }
        ]
      });

      setTimeout(() => {
      drive.drive();
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('Tourcomp', JSON.stringify({ value: true, expiresAt: expiry }));
    }, 1500);
    }
  }, []);

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
