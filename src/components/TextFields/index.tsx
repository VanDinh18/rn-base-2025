import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const textInputVariants = tv({
  slots: {
    container: 'flex-col gap-1',
    label: 'text-sm font-medium',
    input: 'rounded-lg border px-3 py-2',
    errorText: 'mt-1 text-xs',
  },
  variants: {
    variant: {
      default: {
        input: 'border-gray-300 bg-white text-gray-900',
        label: 'text-gray-700',
      },
      filled: {
        input: 'border-transparent bg-gray-100 text-gray-900',
        label: 'text-gray-700',
      },
      outlined: {
        input: 'border-2 border-blue-500 bg-transparent text-gray-900',
        label: 'text-blue-600',
      },
    },
    size: {
      sm: {
        input: 'px-2 py-1 text-sm leading-4',
        label: 'text-xs',
      },
      md: {
        input: 'px-3 py-2 text-base leading-5',
        label: 'text-sm',
      },
      lg: {
        input: 'px-4 py-3 text-lg leading-6',
        label: 'text-base',
      },
    },
    state: {
      default: {},
      error: {
        input: 'border-red-500 bg-red-50',
        label: 'text-red-600',
        errorText: 'text-red-500',
      },
      success: {
        input: 'border-green-500 bg-green-50',
        label: 'text-green-600',
      },
      disabled: {
        input: 'border-gray-200 bg-gray-100 text-gray-400',
        label: 'text-gray-400',
      },
    },
    focused: {
      true: {
        input: 'border-blue-500',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    state: 'default',
  },
});

type TextInputVariants = VariantProps<typeof textInputVariants>;

interface TextFieldProps extends Omit<TextInputProps, 'editable'> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Visual variant of the input */
  variant?: TextInputVariants['variant'];
  /** Size variant of the input */
  size?: TextInputVariants['size'];
  /** State variant of the input */
  state?: TextInputVariants['state'];
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional className for the input */
  className?: string;
  /** Additional className for the container */
  containerClassName?: string;
  /** Additional className for the label */
  labelClassName?: string;
  /** Additional className for the error text */
  errorClassName?: string;
  /** Callback when input value changes */
  onChangeText?: (text: string) => void;
  /** Callback when input gains focus */
  onFocus?: (e: any) => void;
  /** Callback when input loses focus */
  onBlur?: (e: any) => void;
}

const TextField = React.forwardRef<TextInput, TextFieldProps>(
  (
    {
      label,
      error,
      variant = 'default',
      size = 'md',
      state = 'default',
      className,
      containerClassName,
      labelClassName,
      errorClassName,
      disabled = false,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    const currentState: NonNullable<TextInputVariants['state']> = error
      ? 'error'
      : disabled
        ? 'disabled'
        : state;

    const styles = textInputVariants({
      variant,
      size,
      state: currentState,
      focused: isFocused,
    });

    const handleFocus = React.useCallback(
      (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus],
    );

    const handleBlur = React.useCallback(
      (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur],
    );

    return (
      <View className={styles.container({ className: containerClassName })}>
        {label && (
          <Text className={styles.label({ className: labelClassName })}>
            {label}
          </Text>
        )}

        <TextInput
          ref={ref}
          className={styles.input({ className })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          placeholderTextColor={disabled ? '#9CA3AF' : '#6B7280'}
          {...props}
        />

        {error && (
          <Text className={styles.errorText({ className: errorClassName })}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

TextField.displayName = 'TextField';

export { TextField, textInputVariants };
export type { TextFieldProps };
