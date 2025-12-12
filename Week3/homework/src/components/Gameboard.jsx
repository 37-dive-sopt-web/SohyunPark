import { useState } from "react";
import Modal from "./Modal";
import { LEVEL_CONFIG } from "../utils/GameUtil";
import Card from "./Card";
import { MODAL_MESSAGES } from "../constants/ModalMessage";
import { useGame } from "../hooks/useGame";

export default function Gameboard() {
  const [level, setLevel] = useState(1);
  const {
    deck,
    flipped,
    matched,
    status,
    timeLeft,
    history,
    elapsed,
    notice,
    startGame,
    handleCardClick,
  } = useGame(level);

  const { rows, cols } = LEVEL_CONFIG[level];

  return (
    <div className="relative h-full flex flex-col w-full">
      {status === "win" && (
        <Modal
          title={MODAL_MESSAGES.WIN.title}
          message={MODAL_MESSAGES.WIN.getMessage(level, elapsed)}
          subMessage={MODAL_MESSAGES.WIN.subMessage}
          color={MODAL_MESSAGES.WIN.color}
        />
      )}

      {status === "lose" && (
        <Modal
          title={MODAL_MESSAGES.LOSE.title}
          message={MODAL_MESSAGES.LOSE.getMessage(level)}
          subMessage={MODAL_MESSAGES.LOSE.subMessage}
          color={MODAL_MESSAGES.LOSE.color}
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
            {notice ? (
              <p className="text-orange-600">{notice}</p>
            ) : status === "lose" ? (
              <p className="text-red-600">⏰ 시간 초과! 3초 후 재시작</p>
            ) : (
              <p>짝을 맞춰보세요!</p>
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
                      h.isMatch ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {h.text}
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
