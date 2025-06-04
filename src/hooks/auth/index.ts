import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { login } from '@/services/auth';
import { LoginRequest } from '@/services/auth/types';
import { userStore } from '@/store/hooks/useUserStore';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['/auth/login'],
    mutationFn: async (params: LoginRequest) => {
      const { data } = await login(params);
      return data;
    },
    onSuccess: data => {
      userStore.setState({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userInfo: {
          username: data.username,
          avatar: data.image,
          sex: 'male',
          age: 0,
        },
      });
    },
    onError: () => {},
    retry: false,
  });
}

export function useIsLoggedInMutation() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    userStore.getState().accessToken !== null,
  );

  React.useEffect(
    () =>
      userStore.subscribe(state => setIsLoggedIn(state.accessToken !== null)),
    [],
  );

  return {
    isLoggedIn,
  };
}
