import { useState, useEffect } from "react";

function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck(level = 1) {
  const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };
  const [rows, cols] = LEVEL_TO_GRID[level];
  const total = rows * cols;
  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);
  const duplicated = base.flatMap((v) => [
    { id: `${v}-a`, value: v },
    { id: `${v}-b`, value: v },
  ]);
  return shuffle(duplicated);
}

export default function Gameboard() {
  const [level, setLevel] = useState(1);
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);

  const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

  const startGame = () => {
    setDeck(buildDeck(level));
    setFlipped([]);
    setMatched([]);
    setStatus("playing");
    setTimeLeft(45);
    setHistory([]);
  };

  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft <= 0) {
      setStatus("lose");
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  useEffect(() => {
    if (status === "playing" && matched.length === deck.length) {
      setStatus("win");
    }
  }, [matched]);

  const handleCardClick = (card) => {
    if (flipped.length === 2 || flipped.includes(card.id)) return;
    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped.map((id) => deck.find((c) => c.id === id));
      setHistory((prev) => [`${a.value} ↔ ${b.value}`, ...prev.slice(0, 5)]);
      if (a.value === b.value) {
        setMatched((prev) => [...prev, a.id, b.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const [rows, cols] = LEVEL_TO_GRID[level];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center rounded-2xl">
      <div className="flex gap-8 bg-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 w-[960px] h-[600px] justify-between">
        {/* 왼쪽 게임보드 */}
        <div className="flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-900">게임 보드</h2>
            <button
              onClick={startGame}
              className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded-md text-sm shadow-sm"
            >
              게임 리셋
            </button>
          </div>

          {/* 게임보드 */}
          <div
            className="grid bg-blue-50 p-4 rounded-lg shadow-inner"
            style={{
              width: "480px",
              height: "480px",
              display: "grid",
              gap: "8px", // Tailwind gap 대신 직접 픽셀 단위로 설정
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              boxSizing: "border-box",
            }}
          >
            {deck.map((card) => {
              const isFlipped =
                flipped.includes(card.id) || matched.includes(card.id);
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`flex items-center justify-center rounded-lg cursor-pointer text-white text-xl font-bold transition-all duration-200 select-none
          ${
            isFlipped
              ? "bg-white text-blue-700 border border-blue-200"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "1 / 1",
                  }}
                >
                  {isFlipped ? card.value : "?"}
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 정보 패널 */}
        <div className="w-64 bg-blue-50 p-4 rounded-lg flex flex-col gap-3 border border-blue-200">
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="border border-blue-200 rounded-md p-2 text-sm bg-white"
          >
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
          </select>

          <div className="grid grid-cols-2 text-center bg-white p-3 rounded-md shadow-sm border border-blue-100">
            <div>
              <p className="text-gray-500 text-sm">남은 시간</p>
              <p className="font-bold text-lg text-blue-700">
                {timeLeft.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">성공한 짝</p>
              <p className="font-bold text-lg text-blue-700">
                {matched.length / 2}/{deck.length / 2 || 0}
              </p>
            </div>
            <div className="col-span-2 text-sm text-gray-600 mt-2">
              남은 짝: {deck.length / 2 - matched.length / 2 || 0}
            </div>
          </div>

          <div className="bg-white rounded-md p-3 shadow-sm text-sm border border-blue-100">
            <p className="font-semibold mb-1 text-blue-900">안내 메시지</p>
            {status === "idle" && <p>카드를 눌러 게임을 시작하세요</p>}
            {status === "playing" && <p>짝을 맞춰보세요!</p>}
            {status === "win" && <p className="text-green-600">🎉 승리!</p>}
            {status === "lose" && <p className="text-red-600">⏰ 시간 초과!</p>}
          </div>

          <div className="bg-white rounded-md p-3 shadow-sm text-sm flex-1 border border-blue-100 overflow-y-auto">
            <p className="font-semibold mb-1 text-blue-900">최근 히스토리</p>
            {history.length === 0 ? (
              <p className="text-gray-400">아직 뒤집은 카드가 없어요</p>
            ) : (
              <ul className="space-y-1">
                {history.map((h, i) => (
                  <li key={i} className="text-blue-700">
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
