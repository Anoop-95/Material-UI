import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';



const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Helper to validate email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate Name: Only alphabets and should not start with a digit
const validateName = (name) => {
  const regex = /^[A-Za-z][A-Za-z\s]*$/; 
  return regex.test(name);
};

// Validate Password: Minimum 8 characters
const validatePassword = (password) => {
  return password.length >= 8;
};

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      toast.error('Invalid email');
      return;
    }
    if (!validatePassword(password)) {
      setError('Please enter a valid password. The password must be 8 characters');
      toast.error('Invalid password');
      return;
    }
    if (!validateName(name)) {
      setError('Please enter your full name');
      toast.error('PLease enter full name');
      return;
    }

    setError('');
    // ✅ Normally you'd call your API here

    const user = {name, email, password,
                  expiresAt: new Date().getTime() + 60 * 60 * 1000  // Signouts after 1 hour
    };

    localStorage.setItem("user", JSON.stringify(user));
    console.log({user });
    toast.success('Account created successful!');
    navigate('/login');
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 }
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 480,
            p: 4,
            borderRadius: 3,
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Create an Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Join us today 😊
          </Typography>

          <form onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            {error && (
              <Typography color="error" mt={2}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: '#7c3aed',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#6d28d9',
                },
              }}
            >
              SIGN UP
            </Button>

            <Typography mt={2} fontSize="0.9rem" textAlign="center">
              Already registered?{' '}
              <Link to="/login" style={{ color: '#7c3aed', fontWeight: 500 }}>
                Login
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>

      {/* Right Side - Visual */}
      <Grid
        item
        md={6}
        sx={{
          display: { xs: 'none', md: 'block' },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          backgroundColor:"grey",
          
        }}
      >
      

        
        <Box
          sx={{
            width: 192,
            height: 192,
            bgcolor: '#ab47bc',
            borderRadius: '40px',
            position: 'absolute',
            top: -1,
            left: -20,
          }}
        />
        <Box
          sx={{
            width: 192,
            height: 192,
            border: '20px solid #00bcd4',
            borderRadius: '40px',
            position: 'absolute',
            top: 40,
            left: 60,
          }}
        />
        <Box
          sx={{
            width: 192,
            height: 192,
            bgcolor: '#7e57c2',
            borderRadius: '40px',
            position: 'absolute',
            bottom: 40,
            left: -20,
          }}
          
        />
        
         
          
        

        
        
        
      </Grid>
    </Grid>
  );
};

export default Signup;
