import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabScreen from '../screens/BottomTab';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="BottomTab"
        component={BottomTabScreen}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
