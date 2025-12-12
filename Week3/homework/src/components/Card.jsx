const Card = ({ card, isFlipped, level, onClick }) => {
  return (
    <button
      type="button"
      aria-label="카드 선택"
      key={card.id}
      onClick={onClick}
      className={`flex items-center justify-center rounded-lg cursor-pointer text-white text-xl font-bold transition-all duration-200 select-none
                    ${
                      isFlipped
                        ? "bg-blue-300 text-blue-900 border border-blue-200"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    ${level === 1 ? "w-28" : level === 2 ? "w-24" : "w-20"}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {isFlipped ? card.value : "?"}
    </button>
  );
};

export default Card;
