import React, { FormEvent, ReactElement, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from '@app/containers/Store';

const SignInPage = (): ReactElement => {
  const user = useStore(state => state.user);
  const signIn = useStore(state => state.signIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill valid email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    signIn(email, password)
      .catch((error: Error) => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  if (user) {
    return (
      <Navigate to='/' />
    );
  }

  return (
    <>
      <h2>Sign In</h2>

      {isLoading && <p>Loading data...</p>}

      {error && <p>Error: {error}</p>}

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
