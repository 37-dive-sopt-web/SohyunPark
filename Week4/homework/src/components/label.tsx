import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../assets";
interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
}

const Label = ({ label, className, type = "text", ...props }: LabelProps) => {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={props.name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative w-full">
        <input
          {...props}
          id={props.name}
          name={props.name}
          type={currentType}
          className={`w-full border border-gray-600 rounded-md px-3 py-2 pr-10 ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {show ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Label;
