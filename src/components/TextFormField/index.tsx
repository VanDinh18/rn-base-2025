import React from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { TextInput } from 'react-native';

import { TextField, TextFieldProps } from '@/components/TextFields';
import { AnyVoid } from '@/types/declarations';

interface TextFormFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'value' | 'onChangeText' | 'error'> {
  name: FieldPath<T>;
  control: Control<T, any, T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

interface UseFormRefsOptions<T extends FieldValues> {
  fieldNames: FieldPath<T>[];
  submitOnLastField?: boolean;
  onSubmit?: AnyVoid;
}

interface UseFormRefsReturn<T extends FieldValues> {
  refs: Record<string, React.RefObject<TextInput>>;
  focusNext: (currentField: FieldPath<T>) => void;
  focusPrevious: (currentField: FieldPath<T>) => void;
  getFieldProps: (fieldName: FieldPath<T>) => {
    ref: React.RefObject<TextInput>;
    onSubmitEditing: AnyVoid;
    returnKeyType: 'next' | 'done';
    blurOnSubmit: boolean;
  };
}

function TextFormFieldComponent<T extends FieldValues>(
  { name, control, rules, ...textFieldProps }: TextFormFieldProps<T>,
  ref: React.ForwardedRef<TextInput>,
) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...textFieldProps}
          ref={ref}
          value={value}
          onChangeText={onChange}
          error={error?.message}
        />
      )}
      name={name}
      rules={rules}
    />
  );
}

const TextFormField = Object.assign(
  React.forwardRef(TextFormFieldComponent) as <T extends FieldValues>(
    props: TextFormFieldProps<T> & { ref?: React.ForwardedRef<TextInput> },
  ) => React.ReactElement,
  { displayName: 'TextFormField' },
);

const useFormRefs = <T extends FieldValues>({
  fieldNames,
  submitOnLastField = true,
  onSubmit,
}: UseFormRefsOptions<T>): UseFormRefsReturn<T> => {
  // Create refs for each field
  const refs = React.useMemo(() => {
    return fieldNames.reduce(
      (acc, fieldName) => {
        acc[fieldName] = React.createRef<TextInput>();
        return acc;
      },
      {} as Record<string, React.RefObject<TextInput>>,
    );
  }, [fieldNames]);

  const focusNext = React.useCallback(
    (currentField: FieldPath<T>) => {
      const currentIndex = fieldNames.indexOf(currentField);
      const nextIndex = currentIndex + 1;

      if (nextIndex < fieldNames.length) {
        const nextField = fieldNames[nextIndex];
        refs[nextField].current?.focus();
      } else if (submitOnLastField && onSubmit) {
        onSubmit();
      }
    },
    [fieldNames, refs, submitOnLastField, onSubmit],
  );

  const focusPrevious = React.useCallback(
    (currentField: FieldPath<T>) => {
      const currentIndex = fieldNames.indexOf(currentField);
      const previousIndex = currentIndex - 1;

      if (previousIndex >= 0) {
        const previousField = fieldNames[previousIndex];
        refs[previousField].current?.focus();
      }
    },
    [fieldNames, refs],
  );

  const getFieldProps = React.useCallback(
    (fieldName: FieldPath<T>) => {
      const currentIndex = fieldNames.indexOf(fieldName);
      const isLastField = currentIndex === fieldNames.length - 1;

      return {
        ref: refs[fieldName],
        onSubmitEditing: () => focusNext(fieldName),
        returnKeyType: isLastField ? ('done' as const) : ('next' as const),
        blurOnSubmit: isLastField,
      };
    },
    [fieldNames, refs, focusNext],
  );

  return {
    refs,
    focusNext,
    focusPrevious,
    getFieldProps,
  };
};

export { TextFormField, useFormRefs };
export type { TextFormFieldProps, UseFormRefsReturn };
