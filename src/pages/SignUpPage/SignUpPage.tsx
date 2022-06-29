import React, { ReactElement, useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';
import { Link } from 'react-router-dom';
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

interface SignUpPageForm {
  displayName: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpPage = (): ReactElement => {
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    needsEmailVerification
  } = useSignUpEmailPassword();

  const [error, setError] = useState('');

  const form = useForm<SignUpPageForm>({
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    mode: 'all',
    reValidateMode: 'onBlur'
  });

  const isSignedUp = isSuccess || needsEmailVerification;

  const onSubmit: SubmitHandler<SignUpPageForm> = (data): void => {
    const { displayName, email, password } = data;

    setError('');
    signUpEmailPassword(email, password, {
      displayName,
      redirectTo: `${String(process.env.APP_URL)}/signin`
    })
      .then((response) => {
        if (response.error) {
          if (response.error.error === 'email-already-in-use') {
            setError('Email is already in use.');
          } else {
            setError('Error signing up. Please review your account data.');
          }
        }
      })
      .finally(null);
  };

  return (
    <Container maxWidth='xs'>
      <Typography
        component='h1'
        variant='h2'
        sx={{ mb: 2 }}
      >
        Sign Up
      </Typography>

      {!isSignedUp && (
        <Box
          component='form'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name='displayName'
            control={form.control}
            rules={{
              required: { value: true, message: 'Name is required.' },
              minLength: { value: 2, message: 'Name should have at least 2 characters.' },
              maxLength: { value: 32, message: 'Name can have maximum 32 characters.' }
            }}
            render={({ field, formState: { errors } }) =>
              <TextField
                type='text'
                fullWidth
                size='small'
                sx={{ mb: 2 }}
                label='Name'
                autoFocus
                autoComplete='first-name'
                helperText={errors.displayName?.message}
                error={!!errors.displayName}
                disabled={isLoading}
                {...field}
              />
            }
          />
          <Controller
            name='email'
            control={form.control}
            rules={{
              required: { value: true, message: 'Email is required.' },
              maxLength: { value: 128, message: 'Email can have maximum 128 characters.' },
              validate: {
                isEmail: value => isEmail(value) || 'A valid email is required.'
              }
            }}
            render={({ field, formState: { errors } }) =>
              <TextField
                type='email'
                fullWidth
                size='small'
                sx={{ mb: 2 }}
                label='Email'
                autoComplete='email'
                helperText={errors.email?.message}
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
              required: { value: true, message: 'Password is required.' },
              minLength: { value: 8, message: 'Password should have at least 8 characters.' },
              maxLength: { value: 128, message: 'Password can have maximum 128 characters.' }
            }}
            render={({ field, formState: { errors } }) =>
              <TextField
                type='password'
                fullWidth
                size='small'
                sx={{ mb: 2 }}
                label='Password'
                autoComplete='new-password'
                helperText={errors.password?.message}
                error={!!errors.password}
                disabled={isLoading}
                {...field}
              />
            }
          />
          <Controller
            name='passwordConfirmation'
            control={form.control}
            rules={{
              deps: ['password'],
              required: { value: true, message: 'Password confirmation is required.' },
              validate: {
                equalPassword: (value: string) =>
                  form.getValues().password === value || 'The confirmation needs to be the same as the password.'
              }
            }}
            render={({ field, formState: { errors } }) =>
              <TextField
                type='password'
                fullWidth
                size='small'
                sx={{ mb: 2 }}
                label='Password Confirmation'
                autoComplete='new-password'
                helperText={errors.passwordConfirmation?.message}
                error={!!errors.passwordConfirmation}
                disabled={isLoading}
                {...field}
              />
            }
          />

          <Stack
            direction='row'
            spacing={2}
            alignItems='center'
            sx={{ mb: 2 }}
          >
            <Button
              type='submit'
              variant='contained'
              title='Sign Up'
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Link to='/signin'>
              <Button
                variant='outlined'
                title='Sign In'
                disabled={isLoading}
              >
                Sign In
              </Button>
            </Link>
          </Stack>
        </Box>
      )}

      {isLoading && <LinearProgress />}

      {!!error && (
        <Alert severity='error'>
          {error}
        </Alert>
      )}

      {isSignedUp && (
        <Alert severity='success'>
          <Typography component='h4' variant='h4'>
            Successfully signed up!
          </Typography>
          <Typography>
            An activation link has been sent to your email account.{' '}
            Please open the link to activate your account.
          </Typography>
        </Alert>
      )}
    </Container>
  );
};

export { SignUpPage };
