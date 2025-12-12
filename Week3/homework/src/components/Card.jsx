export default function Card({ card, isFlipped, onClick, level, isMatched }) {
  return (
    <button
      onClick={onClick}
      disabled={isMatched}
      className={`relative ${
        level === 1 ? "w-32 h-32" : level === 2 ? "w-24 h-24" : "w-20 h-20"
      } perspective`}
      aria-label="카드 뒤집기"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d
        ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-blue-600 rounded-lg backface-hidden flex items-center justify-center text-white">
          ?
        </div>

        {/* 뒷면 */}
        <div
          className={`absolute inset-0 rounded-lg backface-hidden rotate-y-180 flex items-center justify-center text-xl font-bold ${
            isMatched
              ? "bg-blue-200 text-blue-700"
              : "bg-blue-300 text-blue-900 "
          }`}
        >
          {card.value}
        </div>
      </div>
    </button>
  );
}
