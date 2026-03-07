import React from 'react'

interface TextProps {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'small' | 'lead';
  className?: string;
}

const Text = ({ children, variant = 'default', className = '' }: TextProps) => {
  const variant_classes = {
    default: 'text-base text-gray-900',
    muted:   'text-sm text-gray-500',
    small:   'text-xs text-gray-500',
    lead:    'text-lg text-gray-700 leading-relaxed',
  };

  return (
    <p className={`${variant_classes[variant]} ${className}`}>
      {children}
    </p>
  );
};

export default Text