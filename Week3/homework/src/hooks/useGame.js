import { useEffect, useState } from "react";
import { buildDeck, LEVEL_CONFIG } from "../utils/GameUtil";

export function useGame(level) {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(LEVEL_CONFIG[1].limit);
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);

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

  return {
    deck,
    flipped,
    matched,
    status,
    timeLeft,
    elapsed,
    history,
    startGame,
    handleCardClick,
  };
}
