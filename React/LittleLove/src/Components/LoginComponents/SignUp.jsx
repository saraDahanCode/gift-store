

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import {registerValidate} from '../../functions/validation.js'
import { registerUser } from '../../Persist-redux/userSlice.js';
import { NavLink } from 'react-router-dom';




export default function Login() {
   const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    address: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    username: false,
    address: false,
    phone: false
  });

    const [showPassword, setShowPassword] = useState(false);
  
  function change(e) {
    const { name, value } = e.target;
    setFormData(formData => (
      {
        ...formData,
        [name]: value
      }));

    setErrors(prevErrors => ({  //עדכון אובייקט הסטייט שמחזיק את השגיאות
      ...prevErrors,
      [name]: false //false המיקום באובייקט הסטייט של השגיאות שמייצג את האינפוט הנוכחי יכיל 
    }));

  }

  async function submit(e) {
    e.preventDefault(); // מונע רענון הדף כשמסמנים "submit"
    const newErrors = registerValidate(formData);
    setErrors(newErrors)
    // אם כל השדות תקינים, אפשר להמשיך
    const hasErrors = Object.values(newErrors).some(val => val === true);
    if (!hasErrors) {
      try {
        const user = await dispatch(registerUser(formData)).unwrap();
      }
      catch (err) {
        alert(err.message || 'שגיאה בהתחברות');
        return;
      }
      navigate('/login', {
        state: {
          values: formData
        }
      });
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#0a192f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          borderRadius: '12px',
          border: '2px solid #1976d2',
          backgroundColor: 'white'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 'bold', mt: 1, color: '#0b1d51' }}
        >
           הרשמה
        </Typography>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={submit}>
            <TextField
              label='Username'
              name='username'
              value={formData.username}
              onChange={change}
              error={errors.username}
              helperText={errors.username ? `Please enter a valid phone` : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label='Email'
              name='email'
              value={formData.email}
              onChange={change}
              error={errors.email}
              helperText={errors.email ? `Please enter a valid phone` : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label='Address'
              name='address'
              value={formData.address}
              onChange={change}
              error={errors.address}
              helperText={errors.address ? `Please enter a valid phone` : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label='Phone'
              name='phone'
              value={formData.phone}
              onChange={change}
              error={errors.phone}
              helperText={errors.phone ? `Please enter a valid phone` : ''}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={change}
              error={errors.password}
              helperText={errors.password ? 'Please enter a valid password' : ''}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 1,
                backgroundColor: 'black',
                fontSize: '1.1rem',
                paddingY: 1.2,
                borderRadius: '10px',
              }}
              disabled={Object.values(formData).some(value => value === '')}
            >
              register
            </Button>

         

            <NavLink
              to={'/signUp'}
              style={{
                display: 'block',
                marginTop: 16,
                textAlign: 'center',
                textDecoration: 'none',
                color: '#1976d2',
              }}
            >
              יש לך חשבון? לחץ למעבר להתחברות
            </NavLink>
          </form>
        </Box>
      </Paper>
    </Box>
  );
}
