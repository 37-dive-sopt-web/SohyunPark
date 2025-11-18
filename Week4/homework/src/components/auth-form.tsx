import type { ReactNode, FormHTMLAttributes } from "react";
import { BackIcon } from "../assets";
import { Link } from "react-router";
import Button from "./button";

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  title: string;
  children: ReactNode;
  buttonText: string;
  onClick?: () => void;
  onPrev?: () => void;
  linkTo?: string;
  linkText?: string;
  buttonType?: "button" | "submit" | "reset";
}

const AuthForm = ({
  title,
  children,
  buttonText,
  onClick,
  onPrev,
  linkTo,
  linkText,
  buttonType,
  ...props
}: AuthFormProps) => {
  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md border-gray-100 border-2 h-120 flex flex-col gap-6">
      {onPrev && (
        <button type="button" onClick={onPrev}>
          <BackIcon />
        </button>
      )}

      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>

      <form className="flex flex-col justify-between h-full" {...props}>
        <div className="flex flex-col gap-4">{children}</div>
        <div className="flex flex-col items-center gap-2">
          <Button type={buttonType} onClick={onClick}>
            {buttonText}
          </Button>
          {linkTo && linkText && (
            <Link
              to={linkTo}
              className="text-blue-700 text-center text-sm hover:underline"
            >
              {linkText}
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
