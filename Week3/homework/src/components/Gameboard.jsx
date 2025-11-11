import { useState, useEffect } from "react";

/* Fisher-Yates 셔플 알고리즘 */
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
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

  /* 제한시간 타이머 */
  useEffect(() => {
    if (status !== "playing") return;
    if (timeLeft <= 0) {
      setStatus("lose");
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  /* 승리 판정 */
  useEffect(() => {
    if (status === "playing" && matched.length === deck.length && deck.length) {
      setStatus("win");
    }
  }, [matched, deck, status]);

  /* 승리 또는 패배 후 3초 뒤 자동 리셋 */
  useEffect(() => {
    if (status === "win" || status === "lose") {
      const resetTimer = setTimeout(() => startGame(), 3000);
      return () => clearTimeout(resetTimer);
    }
  }, [status]);

  /* 카드 클릭 처리 */
  const handleCardClick = (card) => {
    if (status !== "playing") return;
    if (flipped.includes(card.id) || matched.includes(card.id)) return;
    if (flipped.length === 2) return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped.map((id) => deck.find((c) => c.id === id));

      const isMatch = a.value === b.value;
      setHistory((prev) => [
        `${a.value},${b.value} → ${isMatch ? "성공" : "실패"}`,
        ...prev.slice(0, 6),
      ]);

      if (isMatch) {
        setMatched((prev) => [...prev, a.id, b.id]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  };

  const [rows, cols] = LEVEL_TO_GRID[level];

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex-1 bg-blue-50 rounded-2xl flex justify-between p-6 gap-5">
        <div className="flex-1 flex items-center flex-col">
          <div className="flex justify-between items-center mb-4 w-full">
            <h2 className="text-xl font-semibold text-blue-900">게임 보드</h2>
            <button
              onClick={startGame}
              className="bg-red-300 hover:bg-red-400 text-white px-3 py-1 rounded-md text-sm shadow-sm"
            >
              게임 리셋
            </button>
          </div>
          <div
            className="grid gap-2 bg-blue-50 rounded-lg justify-center"
            style={{
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
                      ? "bg-blue-300 text-blue-700 border border-blue-200"
                      : "bg-blue-400 hover:bg-blue-500"
                  }
                  ${level === 1 ? "w-30" : level === 2 ? "w-24" : "w-20"}`}
                  style={{ aspectRatio: "1 / 1" }}
                >
                  {isFlipped ? card.value : "?"}
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽 패널 */}
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
                {timeLeft.toFixed(0)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">성공한 짝</p>
              <p className="font-bold text-lg text-blue-700">
                {matched.length / 2}/8
              </p>
            </div>
          </div>
          {/* 안내 메시지 */}
          <div className="bg-white rounded-md p-3 shadow-sm text-sm border border-blue-100">
            <p className="font-semibold mb-1 text-blue-900">안내 메시지</p>
            {status === "idle" && (
              <p>게임을 시작하려면 "게임 리셋"을 누르세요.</p>
            )}
            {status === "playing" && <p>짝을 맞춰보세요!</p>}
            {status === "win" && (
              <p className="text-green-600">🎉 승리! 3초 후 재시작</p>
            )}
            {status === "lose" && (
              <p className="text-red-600">⏰ 시간 초과! 3초 후 재시작</p>
            )}
          </div>
          {/* 히스토리 */}
          <div className="bg-white rounded-md p-3 shadow-sm text-sm flex-1 border border-blue-100 overflow-y-auto">
            <p className="font-semibold mb-1 text-blue-900">최근 히스토리</p>
            {history.length === 0 ? (
              <p className="text-gray-400">아직 뒤집은 카드가 없어요</p>
            ) : (
              <ul className="space-y-1">
                {history.map((h, i) => (
                  <li
                    key={i}
                    className={`text-sm ${
                      h.includes("성공") ? "text-green-600" : "text-red-500"
                    }`}
                  >
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
