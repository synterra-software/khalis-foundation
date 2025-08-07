import type { FC } from 'react';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-w-3xs cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
};
