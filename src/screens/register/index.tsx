import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import authenticateService from '@/api/auth';
import { useAuth } from '@/core';
import { fetchUser } from '@/feature/user/userSlice';

import type { RegisterFormProps } from './register-form';
import { RegisterForm } from './register-form';

export const Register = () => {
  const signIn = useAuth.use.signIn();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

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
  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    setIsLoading(true);
    navigate('InputOtp', data.phone ?? '');
    // mutationLogin.mutate({
    //   email: data.email,
    //   password: data.password,
    // });
  };
  return <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />;
};
