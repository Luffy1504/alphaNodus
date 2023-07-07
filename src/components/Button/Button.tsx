import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  imgSrc?: string;
}


const Button: React.FC<ButtonProps> = ({ text, imgSrc, ...props }) => {
  return (
    <button {...props}>
      {imgSrc && <img src={imgSrc} alt={text || ''} />}
      {text}
    </button>
  );
};

export default Button;
