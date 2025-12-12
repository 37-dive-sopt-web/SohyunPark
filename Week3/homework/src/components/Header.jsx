import Button from "./Button";

const TABS = [
  { key: "game", label: "게임", ariaLabel: "게임 화면으로 이동" },
  { key: "ranking", label: "랭킹", ariaLabel: "랭킹 화면으로 이동" },
];

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="flex items-center justify-between bg-blue-100 h-14 px-4 rounded-xl shadow-sm w-full">
      <h1 className="font-semibold text-lg">숫자 카드 짝 맞추기</h1>

      <nav className="flex gap-2">
        {TABS.map(({ key, label, ariaLabel }) => (
          <Button
            key={key}
            active={activeTab === key}
            onClick={() => setActiveTab(key)}
            aria-label={ariaLabel}
          >
            {label}
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
