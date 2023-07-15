import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import authenticateService from '@/api/auth';
import { useAuth } from '@/core';
import { fetchUser } from '@/feature/user/userSlice';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  const signIn = useAuth.use.signIn();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const mutationLogin = useMutation(authenticateService.authenticate, {
    onSuccess: (data: any | undefined) => {
      if (data) {
        dispatch(fetchUser());
        setIsLoading(false);

        signIn({ access: data.token, refresh: 'refresh-token' });
      }
    },
    onError: () => {
      setIsLoading(false);
    },
  });
  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    setIsLoading(true);
    mutationLogin.mutate({
      email: data.email,
      password: data.password,
    });
  };
  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};
