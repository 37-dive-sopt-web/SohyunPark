export const LEVEL_CONFIG = {
  1: { rows: 4, cols: 4, limit: 45 },
  2: { rows: 4, cols: 6, limit: 60 },
  3: { rows: 6, cols: 6, limit: 100 },
};

/* Fisher-Yates 셔플 알고리즘 */
export function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* 카드 덱 생성 함수 */
export function buildDeck(level = 1) {
  const { rows, cols } = LEVEL_CONFIG[level];
  const total = rows * cols;
  const pairs = total / 2;
  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  const duplicated = base.flatMap((v) => [
    { id: `${v}-a`, value: v },
    { id: `${v}-b`, value: v },
  ]);

  return shuffle(duplicated);
}
