import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        w-full rounded-md p-2 text-white transition-colors duration-200

        ${disabled 
          ? "bg-gray-300 cursor-not-allowed" 
          : "bg-blue-400 hover:bg-blue-500"
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
