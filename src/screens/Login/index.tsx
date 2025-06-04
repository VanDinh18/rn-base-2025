import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { Button } from '@/components/Buttons';
import { TextFormField, useFormRefs } from '@/components/TextFormField';
import { useLoginMutation } from '@/hooks/auth';
import { loginResolver } from '@/utils/validation/resolver';

const LoginScreen = () => {
  const { mutateAsync } = useLoginMutation();

  const onSubmit = (form: ILoginForm) => {
    mutateAsync({ username: form.email, password: form.password });
  };

  const { handleSubmit, control } = useForm<ILoginForm>({
    mode: 'onChange',
    resolver: loginResolver,
    criteriaMode: 'firstError',
    defaultValues: __DEV__
      ? {
          email: 'test@gmail.com',
          password: 'test',
        }
      : undefined,
  });

  const { getFieldProps } = useFormRefs<ILoginForm>({
    fieldNames: ['email', 'password'],
    submitOnLastField: true,
    onSubmit: handleSubmit(onSubmit),
  });

  return (
    <View className="flex-1">
      <KeyboardAwareScrollView className="flex-1">
        <TextFormField
          name="email"
          control={control}
          rules={{ required: true }}
          label="Email"
          placeholder="Enter text"
          containerClassName="mb-4"
          variant="default"
          keyboardType="email-address"
          {...getFieldProps('email')}
        />
        <TextFormField
          name="password"
          control={control}
          rules={{ required: true }}
          label="Password"
          placeholder="Enter text"
          containerClassName="mb-4"
          variant="default"
          secureTextEntry
          {...getFieldProps('password')}
        />
        <Button
          label="Login"
          onPress={handleSubmit(onSubmit)}
          variant="filled"
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default LoginScreen;
