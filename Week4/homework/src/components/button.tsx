import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-full bg-blue-400 rounded-md p-2 text-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
