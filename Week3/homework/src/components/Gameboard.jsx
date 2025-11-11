import { useState } from "react";

/**
 * Fisher–Yates 셔플 함수
 *
 * - 매개변수 array는 섞고 싶은 배열입니다.
 * - 예시: shuffle([1, 2, 3, 4])
 *
 * 원본 배열을 직접 바꾸지 않도록 얕은 복사본을 만든 뒤 섞어 반환해요.
 * 내부 로직이나 네이밍을 바꾸셔도 전혀 상관없습니다 🙂
 */
function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 레벨별 덱을 만들어주는 함수
 *
 * - 매개변수 level은 보드 크기를 결정 (1, 2, 3 중 하나)
 * - 예시: buildDeck(2)
 *
 * 규칙
 * 1) level에 따라 rows x cols 크기의 보드를 가정
 * 2) 각 숫자 값이 2장씩 존재
 * 3) 렌더링 안정성을 위해 카드마다 고유 id를 붙입니다 (예: "3-a", "3-b")
 *
 * 반환값은 섞인 카드 배열입니다. 형식: { id: string, value: number }[]
 * 제공 코드 그대로 사용하셔도 되고, 파일 분리/네이밍 변경 모두 자유입니다.
 */
function buildDeck(level = 1) {
  const LEVEL_TO_GRID = { 1: [4, 4], 2: [4, 6], 3: [6, 6] };

  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  // 카드 총 개수는 짝수여야 합니다 (짝 맞추는 게임이니까)
  if (total % 2 !== 0) throw new Error("카드 개수는 짝수여야 해요.");

  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  // 각 숫자 값을 2장씩 생성하고, 고유 id를 부여
  const duplicated = [];
  for (let i = 0; i < base.length; i += 1) {
    const v = base[i];
    duplicated.push({ id: `${v}-a`, value: v });
    duplicated.push({ id: `${v}-b`, value: v });
  }

  // 매 게임마다 다른 배치를 위해 마지막에 셔플
  return shuffle(duplicated);
}

function Gameboard() {
  /**
   * deckInfo는 현재 덱 상태를 담고 있습니다
   *
   * 포함된 값은 총 3가지
   * 1) data   : 카드 배열 (아직 덱을 만들지 않았다면 null)
   * 2) status : 덱 준비 상태
   *    - 'idle'  : 덱을 아직 만들지 않은 상태
   *    - 'ready' : 덱이 준비된 상태 (그리드 렌더링 가능)
   * 3) level  : 현재 선택된 레벨
   *
   * 심화 과제에서는 level을 Select 컴포넌트로 바꿔보거나,
   * 제한 시간/보드 크기를 level에 맞춰 다르게 구현해보세요.
   */
  const [deckInfo, setDeckInfo] = useState({
    status: "idle",
    data: null,
    level: 1,
  });

  /**
   * 덱을 생성하는 함수
   *
   * - 매개변수 level을 넣어서 호출하면?
   *   deckInfo의 상태(deckInfo.status, deckInfo.data, deckInfo.level)가 바로 바뀝니다.
   * - 예시: generateDeck(2)
   *
   * 제공 코드 그대로 사용하셔도 되고,
   * 함수명을 바꾸거나 파일을 분리하는 등 자유롭게 수정 가능합니다.
   */
  const generateDeck = (level = deckInfo.level) => {
    const data = buildDeck(level);
    setDeckInfo({ status: "ready", data, level });
  };

  // 개발자도구 콘솔에서 deckInfo를 확인해보세요.
  // deckInfo.status, deckInfo.data, deckInfo.level 각각을 찍어보면 이해가 더 쉬워요
  console.log(deckInfo);

  return (
    <div style={{ padding: 16 }}>
      {/* 아래 버튼을 눌러 덱을 직접 생성해보세요! */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => generateDeck(1)}>레벨 1 덱 생성</button>
        <button onClick={() => generateDeck(2)}>레벨 2 덱 생성</button>
        <button onClick={() => generateDeck(3)}>레벨 3 덱 생성</button>
      </div>

      {/* 기본 과제에서는 status가 'ready'일 때만 그리드를 그려도 충분 */}
      {deckInfo.status === "ready" && (
        <div>
          <p>현재 레벨: {deckInfo.level}</p>

          {/**
           * gridTemplateColumns는 레벨에 따라 바뀔 수 있어요.
           * 여기서는 예시로 6열을 사용했어요.
           * 과제 진행 중에는 level에 맞춰 cols 값을 계산해 적용해보세요!
           */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 40px)",
              gap: 8,
            }}
          >
            {deckInfo.data.map((card) => (
              <div
                key={card.id} // 고유 id를 key로 사용해야 렌더링 상태가 안정적
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  height: 40,
                  lineHeight: "40px",
                  textAlign: "center",
                  fontFamily: "monospace",
                }}
                title={card.id} // 개발 중 카드 id가 궁금하다면 마우스를 올려보세요!
              >
                {card.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gameboard;
