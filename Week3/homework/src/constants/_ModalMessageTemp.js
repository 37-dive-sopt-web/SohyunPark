export const MODAL_MESSAGES = {
  WIN: {
    title: "축하해요!!! 🎉",
    getMessage: (level, elapsed) =>
      `Level ${level}을 ${elapsed.toFixed(2)}초 만에 클리어했어요!`,
    subMessage: "3초 후 자동으로 새 게임을 시작해요",
    color: "blue",
  },
  LOSE: {
    title: "시간 초과 😢",
    getMessage: (level) => `아쉽게도 Level ${level}을 클리어하지 못했어요.`,
    subMessage: "3초 후 자동으로 새 게임을 시작해요",
    color: "red",
  },
};
