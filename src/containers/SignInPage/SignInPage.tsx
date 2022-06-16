import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignInEmailPassword } from '@nhost/react';

const SignInPage = (): ReactElement => {
  const { signInEmailPassword, isLoading, isSuccess, isError } = useSignInEmailPassword();

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isError) {
      setError('Error in the authentication. Please review your data.');
    }
  }, [isError]);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!email || !password) {
      setError('Email and password are invalid.');
      return;
    }

    setError('');

    signInEmailPassword(email, password).finally(null);
  };

  if (isSuccess) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <h2>Sign In</h2>

      {!!error && <p>{error}</p>}

      {isLoading && <p>Signing in...</p>}

      <form onSubmit={onSubmit}>
        <div style={{ margin: '0 0 20px' }}>
          <input
            type='email'
            placeholder='Email'
            autoComplete='email'
            required
            autoFocus
            value={email}
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </div>
        <div style={{ margin: '0 0 20px' }}>
          <input
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            required
            minLength={8}
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
          />
        </div>
        <div style={{ margin: '0 0 20px' }}>
          <button>
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export { SignInPage };
