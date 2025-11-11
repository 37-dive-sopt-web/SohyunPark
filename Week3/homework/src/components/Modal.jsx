import { createPortal } from "react-dom";

export default function Modal({ title, message, subMessage, color = "blue" }) {
  const colorMap = {
    blue: {
      border: "border-blue-200",
      title: "text-blue-900",
      message: "text-blue-700",
      sub: "text-blue-500",
      bg: "bg-white/90",
    },
    red: {
      border: "border-red-200",
      title: "text-red-700",
      message: "text-gray-700",
      sub: "text-red-500",
      bg: "bg-white/90",
    },
  };

  const palette = colorMap[color] || colorMap.blue;

  return createPortal(
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
      <div
        className={`${palette.bg} p-6 rounded-xl shadow-lg text-center border ${palette.border}`}
      >
        <h3 className={`text-2xl font-bold mb-2 ${palette.title}`}>{title}</h3>
        <p className={`mb-1 ${palette.message}`}>{message}</p>
        <p className={`font-medium ${palette.sub}`}>{subMessage}</p>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
