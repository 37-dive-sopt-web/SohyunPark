interface LabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Label = ({ label, name, className, ...props }: LabelProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        id={name}
        name={name}
        className={`border rounded-md px-3 py-2 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Label;
