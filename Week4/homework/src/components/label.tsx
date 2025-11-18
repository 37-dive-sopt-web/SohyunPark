import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../assets";
interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
}

const Label = ({
  label,
  name,
  className,
  type = "text",
  ...props
}: LabelProps) => {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword && show ? "text" : type;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={name}
          name={name}
          type={currentType}
          className={`w-full border border-gray-600 rounded-md px-3 py-2 pr-10 ${className}`}
          {...props}
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
