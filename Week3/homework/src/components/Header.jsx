import Button from "./Button";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="flex justify-between bg-blue-100 items-center h-14 px-4 rounded-xl shadow-sm">
      <h1 className="font-semibold text-lg">숫자 카드 짝 맞추기</h1>

      <div className="flex gap-2">
        <Button
          active={activeTab === "game"}
          onClick={() => setActiveTab("game")}
        >
          게임
        </Button>

        <Button
          active={activeTab === "ranking"}
          onClick={() => setActiveTab("ranking")}
        >
          랭킹
        </Button>
      </div>
    </header>
  );
};

export default Header;
