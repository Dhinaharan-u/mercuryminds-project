'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Form = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Clear all manual errors before validation
    clearErrors(['email', 'password']);

    if (data.email !== 'dhina@gmail.com') {
      setError('email', {
        type: 'manual',
        message: 'Invalid email',
      });
    }

    if (data.email === 'dhina@gmail.com' && data.password !== 'dhina@2003') {
      setError('password', {
        type: 'manual',
        message: 'Invalid password',
      });
    }
    if (data.email !=='dhina@gmail.com' && data.password == 'dhina@2003') {
      setError('password', {
        type: 'manual',
        message: 'Invalid email',
      });
    }
    if (data.email === 'dhina@gmail.com' && data.password === 'dhina@2003') {
      
      router.push('/about');
      Swal.fire({
  title: 'Success!',
  text: ' Login successfully.',
  icon: 'success',
  confirmButtonText: 'OK'
})
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 400,
        margin: '40px auto',
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Login Form
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </Box>
    </Paper>
  );
};

export default Form;
