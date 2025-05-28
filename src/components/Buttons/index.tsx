import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  slots: {
    container: 'items-center justify-center ',
    label: 'text-sm font-medium',
  },
  variants: {
    variant: {
      default: {
        container: 'border-gray-300 bg-white text-gray-900',
        label: 'text-gray-700',
      },
      filled: {
        container: 'border-transparent bg-blue-500',
        label: 'text-white',
      },
      outlined: {
        container: 'border border-blue-500 bg-transparent text-gray-900',
        label: 'text-blue-600',
      },
    },
    size: {
      sm: {
        container: 'rounded-sm px-2 py-1',
        label: 'text-xs',
      },
      md: {
        container: 'rounded-md px-3 py-2',
        label: 'text-sm',
      },
      lg: {
        container: 'rounded-lg px-4 py-3',
        label: 'text-base',
      },
    },
    state: {
      default: {},
      disabled: {
        input: 'border-gray-200 bg-gray-100 text-gray-400',
        label: 'text-gray-400',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    state: 'default',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends TouchableOpacityProps {
  containerClassName?: string;
  labelClassName?: string;
  variant?: ButtonVariants['variant'];
  size?: ButtonVariants['size'];
  state?: ButtonVariants['state'];
  label?: string;
}

function Button({
  containerClassName,
  labelClassName,
  variant = 'default',
  size = 'md',
  state = 'default',
  label,
  ...props
}: ButtonProps) {
  const styles = buttonVariants({
    variant,
    size,
    state,
  });

  return (
    <TouchableOpacity
      className={styles.container({ className: containerClassName })}
      {...props}
    >
      <View>
        <Text className={styles.label({ className: labelClassName })}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

Button.displayName = 'Button';

export { Button, buttonVariants };
