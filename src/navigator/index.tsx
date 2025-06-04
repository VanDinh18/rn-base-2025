import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useIsLoggedInMutation } from '@/hooks/auth';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigation = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { isLoggedIn } = useIsLoggedInMutation();

  return (
    <NavigationContainer>
      {children}
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
