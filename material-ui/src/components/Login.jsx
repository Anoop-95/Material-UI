import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Email validation helper
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin =  (e) => {
    e.preventDefault();

    if (!validateEmail(credentials.email)) {
      setError('Please enter a valid email address');
      toast.error('Invalid email');
      return;
    }
    if (credentials.password.length < 8) {
      setError('Password must be at least 8 characters');
      toast.error('Invalid password');
      return;
    }
    
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No user found. Please sign up first.");
      toast.error('No user found');
      return;
    }

    
    if (
      credentials.email === storedUser.email &&
      credentials.password === storedUser.password
    ) {
      toast.success('Login successful!');
      navigate("/");
    } else {
      toast.error('Invalid email or password');
    }
    
    
    
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side - Login Form */}
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={3}
        py={6}
      >
        <Paper elevation={6} sx={{ width: '100%', maxWidth: 420, p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" textAlign="center" mb={3}>
            Welcome back! Please enter your credentials.
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={credentials.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={credentials.password}
              onChange={handleChange}
            />

            {error && (
              <Typography color="error" fontSize="0.875rem" mt={1}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                backgroundColor: '#6C63FF',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#5848dc' },
              }}
            >
              Log In
            </Button>

            <Typography textAlign="center" mt={2} fontSize="0.9rem">
              Don't have an account?{' '}
              <Link to="/signup" sx={{ fontWeight: 'bold', color: '#6C63FF' }}>
                Sign Up
              </Link>
            </Typography>
          </form>
        </Paper>
      </Grid>

      {/* Right Side - Visual Section */}
      {!isMobile && (
        <Grid
          item
          md={6}
          sx={{
            backgroundColor: '##b883c9',
            
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* Decorative shapes */}
          <Box
            sx={{
              width: 192,
              height: 192,
              bgcolor: '#ab47bc',
              borderRadius: '40px',
              position: 'absolute',
              top: -1,
              left: -20,
              zIndex: 1,
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
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              width: 192,
              height: 192,
              bgcolor: '#7e57c2',
              borderRadius: '40px',
              position: 'absolute',
              bottom: -28,
              left: -20,
              zIndex: 1,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Login;
