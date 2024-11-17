import React, { CSSProperties } from 'react';

interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  size?: 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties
}

const Input: React.FC<InputProps> = ({ type, name, value, onChange, required, placeholder,size='s',style }) => {

  const sizeStyles: Record<string, CSSProperties> = {
    s: {
      width:'25%',
    },
    m: {
      width:'45%',
    },
    l: {
      width:'65%',
    },
    xl: {
      width:'85%',
    },
  };

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      style={{
        padding: '12px 16px',
        fontSize: '1em',
        border: '2px solid #FFA500',
        borderRadius:'10px',
        ...sizeStyles[size],
        ...style
      }}
    />
  );
};

export default Input;
