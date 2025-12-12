import { useState, useEffect } from "react";
import Modal from "./Modal";
import { buildDeck, LEVEL_CONFIG } from "../utils/GameUtil";
import Card from "./Card";

export default function Gameboard() {
  const [level, setLevel] = useState(1);
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(LEVEL_CONFIG[1].limit);
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const { rows, cols } = LEVEL_CONFIG[level];

  /* ✅ 게임 시작 함수 */
  const startGame = () => {
    const { limit } = LEVEL_CONFIG[level];
    setDeck(buildDeck(level));
    setFlipped([]);
    setMatched([]);
    setStatus("playing");
    setTimeLeft(limit);
    setElapsed(0);
    setHistory([]);
    setStartTime(performance.now());
  };

  /* ✅ 자동 시작 */
  useEffect(() => {
    startGame();
  }, [level]);

  /* 제한시간 타이머 */
  useEffect(() => {
    if (status !== "playing" || !startTime) return;

    const totalDuration = LEVEL_CONFIG[level].limit * 1000;

    let animationId;
    const tick = (now) => {
      const elapsedMs = now - startTime;
      const remaining = Math.max((totalDuration - elapsedMs) / 1000, 0);
      setTimeLeft(remaining);

      if (status !== "playing") return;

      if (remaining > 0) {
        animationId = requestAnimationFrame(tick);
      } else {
        setStatus("lose");
      }
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [status, level, startTime]);

  /* 승리 판정 */
  useEffect(() => {
    if (status === "playing" && matched.length === deck.length && deck.length) {
      const clearTime = LEVEL_CONFIG[level].limit - timeLeft;
      setElapsed(clearTime);
      setStatus("win");
    }
  }, [matched, deck, status]);

  /* ✅ 승리 시 기록 저장 */
  useEffect(() => {
    if (status === "win" && elapsed > 0) {
      const record = {
        id: Date.now(),
        date: new Date().toLocaleString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        level,
        clearTime: parseFloat(elapsed.toFixed(2)),
      };

      const existing = JSON.parse(localStorage.getItem("rankings") || "[]");
      const updated = [...existing, record]
        .sort((a, b) => a.clearTime - b.clearTime)
        .slice(0, 50);

      localStorage.setItem("rankings", JSON.stringify(updated));
    }
  }, [status, elapsed]);

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

  return (
    <div className="relative h-full flex flex-col w-full">
      {status === "win" && (
        <Modal
          title="축하해요!!! 🎉"
          message={`Level ${level}을 ${elapsed.toFixed(
            2
          )}초 만에 클리어했어요!`}
          subMessage="3초 후 자동으로 새 게임을 시작해요"
          color="blue"
        />
      )}
      {status === "lose" && (
        <Modal
          title="시간 초과 😢"
          message={`아쉽게도 Level ${level}을 클리어하지 못했어요.`}
          subMessage="3초 후 자동으로 새 게임을 시작해요"
          color="red"
        />
      )}

      <div className="flex-1 bg-blue-50 rounded-2xl flex justify-between p-6 gap-5">
        {/* 왼쪽 보드 */}
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
            }}
          >
            {deck.map((card) => {
              const isFlipped =
                flipped.includes(card.id) || matched.includes(card.id);
              return (
                <Card
                  key={card.id}
                  card={card}
                  isFlipped={isFlipped}
                  level={level}
                  onClick={() => handleCardClick(card)}
                />
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
                {timeLeft.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">성공한 짝</p>
              <p className="font-bold text-lg text-blue-700">
                {matched.length / 2}/{deck.length / 2 || 0}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-md p-3 shadow-sm text-sm border border-blue-100">
            <p className="font-semibold mb-1 text-blue-900">안내 메시지</p>
            {status === "playing" && <p>짝을 맞춰보세요!</p>}
            {status === "lose" && (
              <p className="text-red-600">⏰ 시간 초과! 3초 후 재시작</p>
            )}
          </div>

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
