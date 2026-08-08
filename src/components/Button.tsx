import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { sanitizeHref } from '@/utils/security';

// framer-motion redefines these handlers, so they can't be forwarded from the DOM prop types.
type MotionConflictingProps = 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onDrag' | 'onDragStart' | 'onDragEnd';

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps>;

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> {
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

  if (as === 'a') {
    const anchorProps = props as AnchorProps;
    const href = sanitizeHref(anchorProps.href);

    return (
      <motion.a
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
        {...anchorProps}
        href={href}
        rel={anchorProps.target === '_blank' ? 'noopener noreferrer' : anchorProps.rel}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
