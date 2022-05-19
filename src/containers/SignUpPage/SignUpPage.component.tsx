import React, { ReactElement, ReactNode, FormEvent, useState } from 'react';
import { useSignUpEmailPassword } from '@nhost/react';

interface FormFieldProps {
  label: string
  children: ReactNode
}

const FormField = (props: FormFieldProps): ReactElement => {
  const { label, children } = props;
  return (
    <div
      style={{
        margin: '0 0 20px'
      }}
    >
      <label>
        <span>{label}</span>
        {' '}
        <span>{children}</span>
      </label>
    </div>
  );
};

const SignUpPage = (): ReactElement => {
  const {
    signUpEmailPassword,
    isLoading,
    isSuccess,
    isError,
    needsEmailVerification
  } = useSignUpEmailPassword();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const isSignedUp = isSuccess || needsEmailVerification;

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();

    if (!displayName || !email || !password) {
      return;
    }

    void signUpEmailPassword(email, password, {
      displayName,
      redirectTo: `${String(process.env.APP_URL)}/signin`
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {isLoading && <p>Signing up...</p>}

      {isError && <p>Error signing up. Please review your account data.</p>}

      {isSignedUp && (
        <>
          <h3>Successfully signed up!</h3>
          <p>
            We just sent an activation link to your email account.{' '}
            Please open the link to activate your account.
          </p>
        </>
      )}

      {!isSignedUp && (
        <form onSubmit={onSubmit}>
          <FormField label='Name'>
            <input
              type='text'
              placeholder='Display name'
              autoComplete='first-name'
              required
              minLength={2}
              maxLength={64}
              autoFocus
              value={displayName}
              onChange={event => setDisplayName(event.currentTarget.value)}

            />
          </FormField>
          <FormField label='Email'>
            <input
              type='email'
              placeholder='Account Email'
              autoComplete='email'
              required
              value={email}
              onChange={event => setEmail(event.currentTarget.value)}
            />
          </FormField>
          <FormField label='Password'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='new-password'
              required
              minLength={8}
              maxLength={64}
              value={password}
              onChange={event => setPassword(event.currentTarget.value)}
            />
          </FormField>
          <FormField label='Confirm Password'>
            <input
              type='password'
              placeholder='Confirm Password'
              autoComplete='new-password'
              required
              minLength={8}
              maxLength={64}
              value={passwordConfirmation}
              onChange={event => setPasswordConfirmation(event.currentTarget.value)}
            />
          </FormField>
          <div>
            <button>
              Sign Up
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export { SignUpPage };
