import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import useUserStore from '../store/hooks/useUserStore';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

export const RootNavigation = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { isLoggedIn } = useUserStore();

  return (
    <NavigationContainer>
      {children}
      {isLoggedIn() ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
