import React, { FormEvent, ReactElement, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthenticated, useSignInEmailPassword } from '@nhost/react';

const SignInPage = (): ReactElement => {
  const isAuthenticated = useAuthenticated();
  const { signInEmailPassword, isLoading, isSuccess, isError } = useSignInEmailPassword();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    signInEmailPassword(email, password).finally(null);
  };

  if (isAuthenticated || isSuccess) {
    return (
      <Navigate to='/' />
    );
  }

  return (
    <>
      <h2>Sign In</h2>

      {isLoading && <p>Loading data...</p>}

      {isError && <p>There is an error in the process.</p>}

      <form onSubmit={onSubmit}>
        <div>
          <input
            type='email'
            placeholder='Email'
            autoComplete='email'
            value={email}
            onChange={event => setEmail(event.currentTarget.value)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            value={password}
            onChange={event => setPassword(event.currentTarget.value)}
          />
        </div>
        <div>
          <button>
            Sign In
          </button>
        </div>
      </form>
    </>
  );
};

export { SignInPage };
