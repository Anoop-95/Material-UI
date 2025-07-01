import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout'


const UserMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const firstLetter = storedUser?.name?.charAt(0)?.toUpperCase() || '?';

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    handleClose();
    navigate('/login');
    toast.success("Successfully logout")
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Avatar id="user-avatar" sx={{ fontFamily: 'Bebas Neue', backgroundColor:"#FFC107" }}>{firstLetter}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
          
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
            paper: {
                 sx: {
                    width: 140,
                    
                    ml: 'auto',              
                    mr: 0,                   
                    position: 'absolute',   
                    right: 0,
                    backgroundColor:"#353839",
                    mt: 0.65,   
                },
            }
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ justifyContent: 'flex-end', textAlign: 'right', color:"red"}}>
        <LogoutIcon  sx={{ mr: 1 }} />
        Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
