import React from 'react';

type ButtonProps = {
  children: React.ReactElement | string;
  className: string;
  btnRef?: React.RefObject<HTMLButtonElement> | null;
  style?: React.CSSProperties | undefined;
};

function Button({ children, className, style, btnRef }: ButtonProps) {
  return (
    <button style={style} ref={btnRef ? btnRef : null} className={className}>
      {children}
    </button>
  );
}

export default Button;
