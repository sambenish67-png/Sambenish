import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading,
  disabled,
  as = 'button',
  ...props
}) => {
  const { isDark } = useTheme();

  const baseStyles =
    'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 no-underline inline-block';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary:
      'bg-gradient-aurora text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: isDark
      ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
      : 'bg-slate-200 text-slate-900 border border-slate-300 hover:bg-slate-300',
    outline:
      'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-neon',
  };

  const content = isLoading ? (
    <>
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      {children}
    </>
  ) : (
    children
  );

  const sharedProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
    className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`,
  };

  if (as === 'a') {
    return (
      <motion.a {...sharedProps} {...(props as HTMLMotionProps<'a'>)}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button {...sharedProps} disabled={disabled || isLoading} {...props}>
      {content}
    </motion.button>
  );
};

export default Button;
