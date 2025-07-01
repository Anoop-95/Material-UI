import react from 'react';
import { AppBar, Toolbar, Button, IconButton, MenuItem, Box} from '@mui/material';

import {Select} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import UserMenu from './UserMenu';


function Navbar({ selectedCategory, onCategoryChange }) {


  const categories = [
  { label: "General", value: "general" },
  { label: "Business", value: "business" },
  { label: "Health", value: "health" },
  { label: "Science", value: "science" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Technology", value: "technology" },
  { label: "Sports", value: "sports" },
  { label: "World", value: "world" },
  
  ];

  const navigate = useNavigate()

  
  
  const handleSaved =()=>{
    navigate('/saved')
  }

  return(
    <>
    <AppBar position="static" sx={{backgroundColor: '#0B0B45', width: '100%', left: 0}}>
       <Toolbar sx={{display:"flex", alignItems:"center", p:"0", margin:"0"}}>
        <IconButton>
          <Link to='/'><img src='./logo.jpg' alt='logo' style={{width: '50px', height: '50px', borderRadius:"10%"}} /></Link>

        </IconButton>

       

        
        <Select  id="select-bar"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        sx={{backgroundColor:"white", 
        placeholder:"Select category" ,
        fontFamily: 'Bebas Neue',
        height:"2.5rem", 
        color:"black", 
        borderRadius:"10px",
        ml: 2, 
         width: {
          xs: '10rem',  // for small/mobile screens
          sm: '12rem',  //for tablets
          md: '16rem',  // for medium and up (default)
        },
        "&:hover":{backgroundColor:"lightgrey"}}}>


        {categories.map(category => (
            <MenuItem key={category.value} value={category.value}>{category.label} </MenuItem>
          ))}
            
            
        </Select>
        
        
        
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{display: 'flex', justifyContent: "flex-end", gap: 2, alignItems:"center", width: { xs: '100%', sm: 'auto' }}}>
          
          {localStorage.getItem("user") ? 
          (<IconButton onClick={handleSaved}>
            <BookmarkIcon fontSize="large" sx={{ color: '#C78A3B' }} id="saved-page"/>
          </IconButton>): 
          <Link to='/login'><Button variant="contained" sx={{backgroundColor: 'brown', color: 'white', fontFamily: "'Bebas Neue', sans-serif", '&:hover': {backgroundColor: '#a00000',},width: { xs: '60%', sm: 'auto' }}}>Login</Button></Link>}
          {localStorage.getItem("user") ? (<UserMenu />): <Link to='/signup'><Button variant="contained" sx={{backgroundColor: 'brown', color: 'white', fontFamily: "Bebas Neue", '&:hover': {backgroundColor: '#a00000',},width: { xs: '60%', sm: 'auto' }}}>Signup</Button></Link>}

        </Box>
       </Toolbar>
    </AppBar>    
    </>
  )
}


export default Navbar;