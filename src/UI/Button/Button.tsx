import React, { CSSProperties } from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size?: 's' | 'm' | 'l' | 'xl'; 
  style?: React.CSSProperties; 
  type?: 'button' | 'submit' | 'reset'; 
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, size = 's', style, type = 'button', children }) => {
  const sizeStyles: Record<string, CSSProperties> = {
    s: {
      width: '25%',
    },
    m: {
      width: '45%',
    },
    l: {
      width: '60%',
    },
    xl: {
      width: '85%',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '12px 16px',
        fontSize: '1em',
        background:'#f57331',
        color:'white',
        border:'2px solid #f57331',
        borderRadius: '10px',
        ...sizeStyles[size],
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
