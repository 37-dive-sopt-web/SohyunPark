const Button = ({ children }) => {
  return (
    <button className="bg-blue-300 rounded-xl px-3 py-1 cursor-pointer">
      {children}
    </button>
  );
};

export default Button;
