const Button = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-1 font-medium transition 
        ${
          active
            ? "bg-blue-400 text-white shadow-sm"
            : "bg-blue-200 hover:bg-blue-300 text-gray-700"
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
