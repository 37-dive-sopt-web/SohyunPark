import Button from "./Button";

const TABS = [
  { key: "game", label: "게임" },
  { key: "ranking", label: "랭킹" },
];

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="flex items-center justify-between bg-blue-100 h-14 px-4 rounded-xl shadow-sm w-full">
      <h1 className="font-semibold text-lg">숫자 카드 짝 맞추기</h1>

      <nav className="flex gap-2">
        {TABS.map(({ key, label }) => (
          <Button
            key={key}
            active={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </Button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
