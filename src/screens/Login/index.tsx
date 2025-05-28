import { View, Text } from 'react-native';
import React from 'react';
import { usePrevious } from '@/hooks/usePrevious';

const LoginScreen = () => {
  const previous = usePrevious(0);
  
  return (  
    <View className='flex-1'>
      <Text className='text-red-600 font-semibold flex-1'>{`Nativewind ${previous}`}</Text>
    </View>
  );
};

export default LoginScreen;
