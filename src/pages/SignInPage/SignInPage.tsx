import React, { ReactElement, useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSignInEmailPassword } from '@nhost/react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import isEmail from 'validator/es/lib/isEmail';

interface SignInPageForm {
  email: string
  password: string
}

const SignInPage = (): ReactElement => {
  const { signInEmailPassword, isLoading, isSuccess, isError } = useSignInEmailPassword();

  const [error, setError] = useState('');

  const form = useForm<SignInPageForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all',
    reValidateMode: 'onBlur'
  });

  useEffect(() => {
    if (isError) {
      setError('Error in the authentication. Please review your email and password.');
    }
  }, [isError]);

  const onSubmit: SubmitHandler<SignInPageForm> = ({ email, password }): void => {
    setError('');
    signInEmailPassword(email, password).finally(null);
  };

  if (isSuccess) {
    return <Navigate to='/' />;
  }

  return (
    <Container maxWidth='xs'>
      <Typography
        component='h1'
        variant='h2'
        sx={{ mb: 2 }}
      >
        Sign In
      </Typography>

      <Box
        component='form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          name='email'
          control={form.control}
          rules={{
            required: true,
            maxLength: 128,
            validate: {
              isEmail: isEmail
            }
          }}
          render={({ field, formState: { errors } }) =>
            <TextField
              type='email'
              fullWidth
              size='small'
              sx={{ mb: 2 }}
              label='Account Email'
              autoComplete='email'
              autoFocus
              helperText={!!errors.email && 'Email is required.'}
              error={!!errors.email}
              disabled={isLoading}
              {...field}
            />
          }
        />
        <Controller
          name='password'
          control={form.control}
          rules={{
            required: true,
            minLength: 8,
            maxLength: 128
          }}
          render={({ field, formState: { errors } }) =>
            <TextField
              type='password'
              fullWidth
              size='small'
              sx={{ mb: 2 }}
              label='Account Password'
              autoComplete='current-password'
              helperText={!!errors.password && 'Password is required.'}
              error={!!errors.password}
              disabled={isLoading}
              {...field}
            />
          }
        />

        <Stack direction='row' spacing={2} alignItems='center' sx={{ mb: 2 }}>
          <Button
            type='submit'
            variant='contained'
            title='Sign In'
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Sign In
          </Button>
          <Link to='/signup'>
            <Button
              variant='outlined'
              title='Sign Up'
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Box>

      {isLoading && <LinearProgress />}

      {!!error && <Alert severity='error'>{error}</Alert>}
    </Container>
  );
};

export { SignInPage };
